import { NextRequest, NextResponse } from 'next/server'
import { writeFile, unlink, mkdir, readFile, access, rm } from 'fs/promises'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import { tmpdir } from 'os'
import { randomUUID } from 'crypto'
import sharp from 'sharp'
import { PDFDocument } from 'pdf-lib'

const execAsync = promisify(exec)

const OFFICE_EXTS = new Set([
  '.doc', '.docx', '.odt', '.rtf',
  '.ppt', '.pptx', '.odp',
  '.xls', '.xlsx', '.ods',
])

const IMAGE_EXTS = new Set([
  '.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp', '.tiff', '.avif',
])

const ALLOWED_TARGETS = new Set([
  'pdf', 'docx', 'doc', 'odt', 'rtf',
  'pptx', 'ppt', 'odp',
  'xlsx', 'xls', 'ods',
  'png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp', 'tiff', 'avif',
])

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const target = String(formData.get('target') || '').toLowerCase().replace(/^\./, '')

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded. Send it as form field "file".' }, { status: 400 })
    }

    if (!target || !ALLOWED_TARGETS.has(target)) {
      return NextResponse.json({ error: `Missing or unsupported target format: '${target}'` }, { status: 400 })
    }

    const inputExt = path.extname(file.name).toLowerCase()
    const baseName = path.basename(file.name, inputExt).replace(/[^\w.-]/g, '_') || 'file'

    // Create isolated temp workspace
    const workDir = path.join(tmpdir(), `conv-${randomUUID()}`)
    await mkdir(workDir, { recursive: true })

    const inputPath = path.join(workDir, file.name)
    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(inputPath, buffer)

    let outputPath: string

    try {
      if (OFFICE_EXTS.has(inputExt)) {
        outputPath = await convertOfficeFile(inputPath, inputExt, target, workDir)
      } else if (IMAGE_EXTS.has(inputExt)) {
        outputPath = await convertImageFile(inputPath, target, workDir)
      } else {
        await cleanup(inputPath, workDir)
        return NextResponse.json({ error: `Unsupported input file type: '${inputExt}'` }, { status: 415 })
      }

      const outputBuffer = await readFile(outputPath)
      const downloadName = `${baseName}.${target}`

      // Clean up before sending response
      await cleanup(inputPath, workDir)

      return new NextResponse(outputBuffer, {
        headers: {
          'Content-Type': getMimeType(target),
          'Content-Disposition': `attachment; filename="${downloadName}"`,
        },
      })
    } catch (error) {
      await cleanup(inputPath, workDir)
      throw error
    }
  } catch (error: any) {
    console.error('Conversion failed:', error)
    return NextResponse.json({ error: 'Conversion failed', details: error.message }, { status: 500 })
  }
}

async function convertOfficeFile(inputPath: string, inputExt: string, target: string, workDir: string): Promise<string> {
  // Check if LibreOffice is available
  try {
    await execAsync('where soffice || where libreoffice || which soffice || which libreoffice')
  } catch {
    throw new Error('LibreOffice is not installed on this server. Please install it to convert office documents.\n\nWindows: Download from https://www.libreoffice.org/download/\nmacOS: brew install --cask libreoffice\nLinux: sudo apt-get install libreoffice')
  }

  const profileDir = path.join(workDir, `lo-profile-${randomUUID()}`)
  const userInstallation = `-env:UserInstallation=file://${profileDir}`

  const cmd = [
    'soffice',
    '--headless',
    '--norestore',
    userInstallation,
    '--convert-to', target,
    '--outdir', workDir,
    inputPath,
  ].join(' ')

  await execAsync(cmd, { timeout: 60_000 })

  const expectedName = path.basename(inputPath, inputExt) + '.' + target
  const outputPath = path.join(workDir, expectedName)

  await access(outputPath)
  return outputPath
}

async function convertImageFile(inputPath: string, target: string, workDir: string): Promise<string> {
  const outputPath = path.join(workDir, `output.${target}`)
  
  // For image-to-image conversion, use Sharp
  if (target !== 'pdf') {
    const sharpFormat = target === 'jpg' ? 'jpeg' : target as any
    await sharp(inputPath).toFormat(sharpFormat).toFile(outputPath)
    return outputPath
  }
  
  // For image-to-PDF conversion, use pdf-lib
  const imageBuffer = await readFile(inputPath)
  const image = await sharp(inputPath).metadata()
  
  const pdfDoc = await PDFDocument.create()
  let pdfImage
  
  const ext = path.extname(inputPath).toLowerCase()
  if (['.jpg', '.jpeg'].includes(ext)) {
    pdfImage = await pdfDoc.embedJpg(imageBuffer)
  } else {
    pdfImage = await pdfDoc.embedPng(imageBuffer)
  }
  
  const page = pdfDoc.addPage([pdfImage.width, pdfImage.height])
  page.drawImage(pdfImage, { x: 0, y: 0, width: pdfImage.width, height: pdfImage.height })
  
  const pdfBytes = await pdfDoc.save()
  await writeFile(outputPath, pdfBytes)
  
  return outputPath
}

async function cleanup(inputPath: string, workDir: string) {
  await unlink(inputPath).catch(() => {})
  await rm(workDir, { recursive: true, force: true }).catch(() => {})
}

function getMimeType(format: string): string {
  const mimeTypes: Record<string, string> = {
    pdf: 'application/pdf',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    doc: 'application/msword',
    odt: 'application/vnd.oasis.opendocument.text',
    rtf: 'application/rtf',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ppt: 'application/vnd.ms-powerpoint',
    odp: 'application/vnd.oasis.opendocument.presentation',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    xls: 'application/vnd.ms-excel',
    ods: 'application/vnd.oasis.opendocument.spreadsheet',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    webp: 'image/webp',
    gif: 'image/gif',
    bmp: 'image/bmp',
    tiff: 'image/tiff',
    avif: 'image/avif',
  }
  return mimeTypes[format] || 'application/octet-stream'
}
