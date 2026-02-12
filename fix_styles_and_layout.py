
import os
import re

CSS_FILE = r"c:\REPOSITORIOS GITHUB\PROYECTO_WEB_TERCERPARCIAL\static\assets\css\custom.css"
FILES_TO_FIX = [
    r"c:\REPOSITORIOS GITHUB\PROYECTO_WEB_TERCERPARCIAL\PythonVsPHP\operadores.html",
    r"c:\REPOSITORIOS GITHUB\PROYECTO_WEB_TERCERPARCIAL\PythonVsPHP\estructuras_control.html"
]
FUNCIONES_HTML = r"c:\REPOSITORIOS GITHUB\PROYECTO_WEB_TERCERPARCIAL\PythonVsPHP\funciones.html"

NEW_STYLES = """
/* ============ ESTILOS DE COMPARATIVAS (PORTED FROM funciones.html) ============ */
/* Sidebar Overrides if needed, though custom.css sidebar-nav might suffice */
/* .sidebar-nav { position: sticky; top: 100px; ... } */

.compare-row { display: flex; gap: 1.5rem; margin: 1.5rem 0; flex-wrap: wrap; }
.compare-col { flex: 1; min-width: 280px; }
.lang-card { border-radius: 16px; padding: 1.5rem; height: 100%; border: 1px solid rgba(0,0,0,0.08); }
.lang-card.python { background: linear-gradient(135deg, rgba(55,118,171,0.08) 0%, rgba(255,212,59,0.08) 100%); border-left: 4px solid #3776ab; }
.lang-card.php { background: linear-gradient(135deg, rgba(119,123,180,0.08) 0%, rgba(137,147,190,0.08) 100%); border-left: 4px solid #777bb4; }
.lang-badge { display: inline-block; padding: 4px 14px; border-radius: 20px; font-weight: 700; font-size: 0.85rem; margin-bottom: 1rem; }
.lang-badge.python { background: linear-gradient(135deg, #3776ab, #ffd43b); color: white; }
.lang-badge.php { background: linear-gradient(135deg, #777bb4, #8993be); color: white; }

.slide-section { padding: 2rem 0; border-bottom: 1px solid rgba(0,0,0,0.06); }
.slide-section:last-child { border-bottom: none; }
.slide-number { display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #667eea, #764ba2); color: white; font-weight: 700; font-size: 0.8rem; margin-right: 10px; }

.code-box { background: #0f172a; color: #e2e8f0; padding: 18px; border-radius: 12px; font-family: 'Fira Code', ui-monospace, monospace; font-size: 0.88rem; overflow-x: auto; margin: 12px 0; border: 1px solid rgba(255,255,255,0.1); white-space: pre; }
.info-box { background: rgba(102,126,234,0.08); border-radius: 12px; padding: 1.2rem; border-left: 4px solid #667eea; margin: 1rem 0; }
.warning-box { background: rgba(239,68,68,0.08); border-radius: 12px; padding: 1.2rem; border-left: 4px solid #ef4444; margin: 1rem 0; }

/* Custom Table Styles for operadores.html */
.operator-table {
  width: 100%;
  margin-bottom: 1.5rem;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  border: 1px solid #e2e8f0;
}
.operator-table th, .operator-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #f1f5f9;
}
.operator-table th {
  background-color: #f8fafc;
  font-weight: 600;
  color: #1a202c;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
}
.operator-table tr:last-child td {
  border-bottom: none;
}
.operator-table .op-code {
  font-family: 'Fira Code', monospace;
  background: #edf2f7;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  color: #2d3748;
  font-weight: 500;
}
.badge-si {
  display: inline-block;
  padding: 0.25em 0.6em;
  font-size: 0.75em;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  background-color: #198754;
}
.badge-no {
  display: inline-block;
  padding: 0.25em 0.6em;
  font-size: 0.75em;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  background-color: #dc3545;
}
"""

def append_styles():
    with open(CSS_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if "/* ============ ESTILOS DE COMPARATIVAS" in content:
        print("Styles already present in custom.css")
        return

    with open(CSS_FILE, 'a', encoding='utf-8') as f:
        f.write("\n" + NEW_STYLES)
    print("Appended styles to custom.css")

def fix_html_files():
    # Detect code-block pattern (PHP)
    php_pattern = re.compile(
        r'<div class="code-block">\s*<div class="code-block-header php-header">\s*<i class="bi bi-filetype-php"></i>\s*PHP\s*</div>\s*<pre>(.*?)</pre>\s*</div>',
        re.DOTALL
    )
    
    # Detect code-block pattern (Python) -- Note: check if header says PYTHON or Python
    # In estructuras_control.html it says PYTHON (uppercase)
    python_pattern = re.compile(
        r'<div class="code-block">\s*<div class="code-block-header python-header">\s*<i class="bi bi-filetype-py"></i>\s*PYTHON\s*</div>\s*<pre>(.*?)</pre>\s*</div>',
        re.DOTALL | re.IGNORECASE
    )

    # Detect container
    comparison_container_pattern = re.compile(r'<div class="code-comparison">')
    comparison_container_close_pattern = re.compile(r'</div><!-- end code-comparison -->') # risky to assume comment

    for filepath in FILES_TO_FIX:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        modified = content
        
        # Replace container class
        modified = modified.replace('<div class="code-comparison">', '<div class="compare-row">')
        
        # Replace PHP blocks
        modified = php_pattern.sub(
            r'<div class="compare-col">\n<div class="lang-card php">\n<span class="lang-badge php"><i class="bi bi-filetype-php me-1"></i> PHP</span>\n<pre class="code-box">\1</pre>\n</div>\n</div>',
            modified
        )
        
        # Replace Python blocks
        modified = python_pattern.sub(
            r'<div class="compare-col">\n<div class="lang-card python">\n<span class="lang-badge python"><i class="bi bi-filetype-py me-1"></i> Python</span>\n<pre class="code-box">\1</pre>\n</div>\n</div>',
            modified
        )
        
        if modified != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(modified)
            print(f"Updated {filepath}")
        else:
            print(f"No changes made to {filepath}")

def clean_funciones_html():
    with open(FUNCIONES_HTML, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # regex to remove <style>...</style> block
    style_pattern = re.compile(r'<style>.*?</style>', re.DOTALL)
    
    if style_pattern.search(content):
        new_content = style_pattern.sub('', content)
        with open(FUNCIONES_HTML, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Removed inline styles from {FUNCIONES_HTML}")
    else:
        print(f"No inline styles found in {FUNCIONES_HTML}")

def main():
    append_styles()
    fix_html_files()
    clean_funciones_html()

if __name__ == "__main__":
    main()
