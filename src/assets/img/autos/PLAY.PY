from PIL import Image
import os
import re

def limpiar_guiones_dobles_y_mayusculas(carpeta):
    archivos = os.listdir(carpeta)
    print(f"📂 Archivos en: {os.path.abspath(carpeta)}")

    for archivo in archivos:
        ruta_original = os.path.join(carpeta, archivo)

        if not os.path.isfile(ruta_original):
            continue

        # Limpiar guiones y poner en mayúsculas
        nombre_limpio = re.sub(r'_+', '_', archivo)
        nombre_mayusculas = nombre_limpio.upper()
        nueva_ruta = os.path.join(carpeta, nombre_mayusculas)

        if nombre_mayusculas != archivo:
            os.rename(ruta_original, nueva_ruta)
            print(f"🔄 Renombrado: {archivo} → {nombre_mayusculas}")
        else:
            print(f"✔️ Sin cambios: {archivo}")

def convertir_jpg_a_webp_mismo_directorio(carpeta):
    archivos = os.listdir(carpeta)
    print(f"📂 Carpeta: {os.path.abspath(carpeta)}")
    print("📄 Archivos encontrados:", archivos)

    for archivo in archivos:
        if archivo.lower().endswith((".jpg", ".jpeg")):
            ruta_jpg = os.path.join(carpeta, archivo)

            # Limpiar guiones, poner en mayúsculas y cambiar extensión
            nombre_base = os.path.splitext(archivo)[0]
            nombre_limpio = re.sub(r'_+', '_', nombre_base).upper()
            nombre_webp = nombre_limpio + ".WEBP"
            ruta_webp = os.path.join(carpeta, nombre_webp)

            try:
                with Image.open(ruta_jpg) as imagen:
                    imagen.save(ruta_webp, "webp")
                    print(f"✅ Convertido: {archivo} → {nombre_webp}")
            except Exception as e:
                print(f"❌ Error al convertir {archivo}: {e}")
        else:
            print(f"⚠️ No es JPG: {archivo}")

# Uso:
carpeta_actual = os.path.dirname(__file__)
# convertir_jpg_a_webp_mismo_directorio(carpeta_actual)
limpiar_guiones_dobles_y_mayusculas(carpeta_actual)
