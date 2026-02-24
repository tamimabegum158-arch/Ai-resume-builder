import { COLOR_THEMES, type ColorThemeId } from '../context/TemplateContext'
import './ColorThemePicker.css'

type Props = {
  colorTheme: ColorThemeId
  onSelect: (c: ColorThemeId) => void
}

export function ColorThemePicker({ colorTheme, onSelect }: Props) {
  return (
    <div className="color-theme-picker">
      <div className="color-theme-picker-label">Color theme</div>
      <div className="color-theme-picker-circles" role="group" aria-label="Accent color">
        {COLOR_THEMES.map((theme) => (
          <button
            key={theme.id}
            type="button"
            className="color-theme-circle"
            style={{ backgroundColor: theme.value }}
            onClick={() => onSelect(theme.id)}
            aria-pressed={colorTheme === theme.id}
            aria-label={theme.label}
            title={theme.label}
          />
        ))}
      </div>
    </div>
  )
}
