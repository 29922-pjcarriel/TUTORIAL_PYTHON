
import os
import re

# correct items for the Python VS PHP dropdown
# We will generate the HTML dynamically based on depth
NAV_ITEMS = [
    ("introduccion.html", "bi-info-circle me-2 text-primary", "Introducción"),
    ("sintaxis.html", "bi-code-slash me-2 text-info", "Sintaxis"),
    ("operadores.html", "bi-funnel me-2 text-info", "Operadores"),
    ("estructuras_control.html", "bi-diagram-3 me-2 text-success", "Estructuras de Control"),
    ("funciones.html", "bi-braces-asterisk me-2 text-warning", "Funciones"),
    ("excepciones.html", "bi-exclamation-triangle me-2 text-danger", "Excepciones"),
    ("poo.html", "bi-box me-2 text-purple", "POO"),
    ("conexion_mysql.html", "bi-database me-2 text-success", "Conexión a MySQL"),
    ("sesiones.html", "bi-shield-lock me-2 text-secondary", "Sesiones y Login"),
]

def generate_navbar_li(depth):
    prefix = "../" if depth > 0 else ""
    
    # Base indentation for list items
    indent = "              " 
    
    html = f'''          <li class="nav-item dropdown">
            <a class="nav-link nav-link-custom dropdown-toggle" href="#" data-bs-toggle="dropdown">
              <i class="bi bi-arrow-left-right me-1"></i> Python VS PHP
            </a>
            <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3">
'''
    for filename, icon, label in NAV_ITEMS:
        link = f"{prefix}PythonVsPHP/{filename}"
        html += f'{indent}<li><a class="dropdown-item py-2" href="{link}"><i class="bi {icon}"></i>{label}</a></li>\n'
    
    html += f'''{indent}<li>
{indent}  <hr class="dropdown-divider">
{indent}</li>
{indent}<li><a class="dropdown-item py-2 fw-semibold" href="{prefix}PythonvsPHP.html"><i class="bi bi-grid me-2"></i>Ver Comparativa</a></li>
            </ul>
          </li>'''
    return html

def update_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Determine depth
    # root files are at depth 0
    # subdirs (e.g. PythonVsPHP/foo.html) are depth 1
    # We assume simple structure (root/*.html or root/dir/*.html)
    rel_path = os.path.relpath(filepath, os.getcwd())
    depth = rel_path.count(os.sep)

    new_navbar_block = generate_navbar_li(depth)

    # Regex to find the "Python VS PHP" list item
    # It usually starts with <li class="nav-item dropdown"> and contains "Python VS PHP" text
    # We stick to a pattern that captures the whole LI.
    # We look for the LI that contains "Python VS PHP" in the anchor
    
    pattern = re.compile(
        r'<li class="nav-item dropdown">\s*<a class="nav-link[^"]*" href="#" data-bs-toggle="dropdown">\s*<i class="bi bi-arrow-left-right me-1"></i> Python VS PHP.*?</ul>\s*</li>',
        re.DOTALL
    )

    if pattern.search(content):
        new_content = pattern.sub(new_navbar_block, content)
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filepath}")
        else:
            print(f"No changes needed for {filepath}")
    else:
        print(f"Pattern not found in {filepath}")

def main():
    root_dir = os.getcwd()
    for root, dirs, files in os.walk(root_dir):
        if ".git" in root:
            continue
        for file in files:
            if file.endswith(".html"):
                update_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
