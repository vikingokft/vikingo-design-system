import { AlertCircle, CheckCircle2, FileText, UploadCloud, X } from 'lucide-react'
import * as React from 'react'
import { cn } from '../../utils/cn'

// ── Types ────────────────────────────────────────────────────────────────────

export interface FileUploadProps {
  accept?: string
  multiple?: boolean
  maxSize?: number // bytes
  onFileSelect?: (files: File[]) => void
  /** Controlled upload progress 0–100 (shows progress bar when set) */
  progress?: number
  /** Error message to display */
  error?: string
  /** Success message to display */
  success?: string
  disabled?: boolean
  className?: string
  /** Hint text inside the drop zone */
  hint?: string
  /** Accent-colored text in the drop zone (the "click to upload" part) */
  clickLabel?: string
  /** Plain text in the drop zone (the "or drag here" part) */
  dragLabel?: string
  /** Label shown next to the progress bar percentage */
  uploadingLabel?: string
  /** Prefix of the file size error message – formatted max size is appended automatically */
  fileSizeErrorLabel?: string
  /** aria-label for the remove-file button on each selected file row */
  removeFileLabel?: string
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// ── Component ────────────────────────────────────────────────────────────────

export function FileUpload({
  accept,
  multiple = false,
  maxSize,
  onFileSelect,
  progress,
  error,
  success,
  disabled = false,
  className,
  hint,
  clickLabel = 'Kattints a feltöltéshez',
  dragLabel = 'vagy húzd ide a fájlt',
  uploadingLabel = 'Feltöltés...',
  fileSizeErrorLabel = 'A fájl mérete meghaladja a maximumot',
  removeFileLabel = 'Fájl eltávolítása',
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = React.useState(false)
  const [files, setFiles] = React.useState<File[]>([])
  const [sizeError, setSizeError] = React.useState<string | null>(null)

  function processFiles(fileList: FileList | null) {
    if (!fileList) return
    const arr = Array.from(fileList)

    if (maxSize) {
      const oversized = arr.filter((f) => f.size > maxSize)
      if (oversized.length > 0) {
        setSizeError(`${fileSizeErrorLabel} (${formatBytes(maxSize)})`)
        return
      }
    }

    setSizeError(null)
    const next = multiple ? arr : arr.slice(0, 1)
    setFiles(next)
    onFileSelect?.(next)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    if (disabled) return
    processFiles(e.dataTransfer.files)
  }

  function removeFile(index: number) {
    const next = files.filter((_, i) => i !== index)
    setFiles(next)
    onFileSelect?.(next)
    setSizeError(null)
  }

  const displayError = error ?? sizeError

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {/* Drop zone */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && !disabled && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled) setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          'flex flex-col items-center justify-center gap-3 rounded-[var(--radius-xl)]',
          'border-2 border-dashed px-6 py-10 text-center',
          'transition-all cursor-pointer select-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40',
          dragOver
            ? 'border-[var(--color-accent)] bg-[var(--color-accent-muted)] scale-[1.01]'
            : 'border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent-muted)]/40',
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          displayError && 'border-[var(--color-error)] bg-[var(--color-error-muted)]',
        )}
      >
        <div
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-full',
            'bg-[var(--color-surface)] border border-[var(--color-border)]',
            dragOver && 'border-[var(--color-accent)] text-[var(--color-accent)]',
          )}
        >
          <UploadCloud className="h-5 w-5 text-[var(--color-text-muted)]" />
        </div>

        <div>
          <p className="text-sm font-medium text-[var(--color-text)]">
            <span className="text-[var(--color-accent)]">{clickLabel}</span> {dragLabel}
          </p>
          {hint && <p className="text-xs text-[var(--color-text-muted)] mt-1">{hint}</p>}
          {maxSize && (
            <p className="text-xs text-[var(--color-text-subtle)] mt-0.5">
              Max. {formatBytes(maxSize)}
            </p>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={(e) => processFiles(e.target.files)}
          disabled={disabled}
        />
      </div>

      {/* Progress bar */}
      {progress !== undefined && progress > 0 && progress < 100 && (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between text-xs text-[var(--color-text-muted)]">
            <span>{uploadingLabel}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[var(--color-border)] overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Error */}
      {displayError && (
        <div className="flex items-center gap-2 text-sm text-[var(--color-error)]">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {displayError}
        </div>
      )}

      {/* Success */}
      {success && !displayError && (
        <div className="flex items-center gap-2 text-sm text-[var(--color-success)]">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          {success}
        </div>
      )}

      {/* Selected files */}
      {files.length > 0 && !displayError && (
        <div className="flex flex-col gap-2">
          {files.map((file, i) => (
            <div
              key={i}
              className={cn(
                'flex items-center gap-3 px-3 py-2',
                'rounded-[var(--radius-md)] border border-[var(--color-border)]',
                'bg-[var(--color-surface)]',
              )}
            >
              <FileText className="h-4 w-4 shrink-0 text-[var(--color-text-muted)]" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{formatBytes(file.size)}</p>
              </div>
              <button
                type="button"
                aria-label={removeFileLabel}
                onClick={() => removeFile(i)}
                className="shrink-0 p-1 rounded text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)] transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
