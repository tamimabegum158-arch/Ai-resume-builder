import type { TemplateId } from '../context/TemplateContext'
import './TemplatePicker.css'

const OPTIONS: { id: TemplateId; label: string }[] = [
  { id: 'classic', label: 'Classic' },
  { id: 'modern', label: 'Modern' },
  { id: 'minimal', label: 'Minimal' },
]

type Props = {
  template: TemplateId
  onSelect: (t: TemplateId) => void
  accentColor: string
}

export function TemplatePicker({ template, onSelect, accentColor }: Props) {
  return (
    <div className="template-picker">
      <div className="template-picker-label">Template</div>
      <div className="template-picker-thumbnails">
        {OPTIONS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={'template-thumb' + (template === id ? ' active' : '')}
            onClick={() => onSelect(id)}
            aria-pressed={template === id}
            aria-label={label + ' template'}
          >
            <div className={'template-thumb-sketch template-thumb-sketch-' + id}>
              <span className="template-thumb-check" aria-hidden>{template === id ? '\u2713' : ''}</span>
              {id === 'classic' && (
                <>
                  <div className="sketch-line sketch-name" />
                  <div className="sketch-hr" />
                  <div className="sketch-line" />
                  <div className="sketch-hr" />
                  <div className="sketch-line sketch-short" />
                </>
              )}
              {id === 'modern' && (
                <>
                  <div className="sketch-sidebar" style={{ background: accentColor }} />
                  <div className="sketch-main">
                    <div className="sketch-line" />
                    <div className="sketch-line sketch-short" />
                    <div className="sketch-line" />
                  </div>
                </>
              )}
              {id === 'minimal' && (
                <>
                  <div className="sketch-line sketch-name" />
                  <div className="sketch-gap" />
                  <div className="sketch-line" />
                  <div className="sketch-gap" />
                  <div className="sketch-line sketch-short" />
                </>
              )}
            </div>
            <span className="template-thumb-label">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
