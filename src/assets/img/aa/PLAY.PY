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
        if archivo.lower().endswith((".jpg", ".jpeg", ".png")):
            ruta_jpg = os.path.join(carpeta, archivo)

            # Limpiar guiones, poner en mayúsculas y cambiar extensión
            nombre_base = os.path.splitext(archivo)[0]
            nombre_limpio = nombre_base # re.sub(r'_+', '_', nombre_base).upper()
            nombre_webp = nombre_limpio + ".webp"
            ruta_webp = os.path.join(carpeta, nombre_webp)

            try:
                with Image.open(ruta_jpg) as imagen:
                    imagen.save(ruta_webp, "webp")
                    print(f"✅ Convertido: {archivo} → {nombre_webp}")
            except Exception as e:
                print(f"❌ Error al convertir {archivo}: {e}")
        else:
            print(f"⚠️ No es JPG: {archivo}")

def comprimir_webp_a_200kb(carpeta, max_peso_kb=200, max_dimensiones=(1024, 1024)):
    archivos = os.listdir(carpeta)
    print(f"📂 Carpeta: {os.path.abspath(carpeta)}")

    for archivo in archivos:
        if not archivo.lower().endswith(".webp"):
            continue

        ruta_img = os.path.join(carpeta, archivo)

        try:
            with Image.open(ruta_img) as img:
                img = img.convert("RGB")  # Evita errores con modo alpha

                calidad = 80
                ancho, alto = img.size

                # Redimensionar si es más grande que el límite
                if ancho > max_dimensiones[0] or alto > max_dimensiones[1]:
                    img.thumbnail(max_dimensiones)

                # Guardar temporal y ajustar calidad hasta que pese menos de 200 KB
                while calidad > 10:
                    ruta_temporal = os.path.join(carpeta, "temp_" + archivo)
                    img.save(ruta_temporal, "webp", quality=calidad)

                    peso_kb = os.path.getsize(ruta_temporal) / 1024
                    if peso_kb <= max_peso_kb:
                        os.replace(ruta_temporal, ruta_img)
                        print(f"✅ Comprimido: {archivo} → {round(peso_kb, 1)} KB (calidad {calidad})")
                        break

                    calidad -= 5

                else:
                    print(f"⚠️ No se pudo reducir {archivo} por debajo de {max_peso_kb} KB (mínima calidad alcanzada)")
                    if os.path.exists(ruta_temporal):
                        os.remove(ruta_temporal)

        except Exception as e:
            print(f"❌ Error procesando {archivo}: {e}")

# Uso:
carpeta_actual = os.path.dirname(__file__)
# convertir_jpg_a_webp_mismo_directorio(carpeta_actual)
comprimir_webp_a_200kb(carpeta_actual)
# limpiar_guiones_dobles_y_mayusculas(carpeta_actual)
