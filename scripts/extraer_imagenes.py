"""Extrae y recorta las imágenes del Tema 1 a partir del PDF de los apuntes.

Uso:  python3 scripts/extraer_imagenes.py
Requiere: poppler-utils (pdftoppm) y Pillow.

Las cajas de recorte están en puntos de la vista previa a 60 ppp (página de 702 × 496 px).
Las zonas a blanquear (para quitar las etiquetas originales) están en % del recorte.
"""
import os, subprocess, tempfile
from PIL import Image, ImageDraw

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF = os.path.join(RAIZ, 'DOCS', 'APUNTES', 'Tema 1_Clasificación de MCIA.pdf')
SALIDA = os.path.join(RAIZ, 'public', 'img', 'tema1')

BLANCO = (255, 255, 255)
GRIS19 = None  # se muestrea del fondo

# id: (diapositiva, ppp de render, caja en coordenadas 60 ppp, [blanqueos (x0,y0,x1,y1 %, color)])
IMAGENES = {
    'V1-01': (10, 200, (258, 190, 478, 442), [((94, 10, 100, 34), BLANCO)]),
    'V1-02': (11, 400, (108, 110, 285, 265), [
        ((0, 0, 100, 2.6), BLANCO), ((13, 7.5, 30, 16), BLANCO), ((62, 3.5, 77.5, 12.8), BLANCO),
        ((11, 33.5, 29.5, 41.8), BLANCO), ((5, 43.5, 29.5, 54.2), BLANCO), ((73.5, 33.5, 100, 43.8), BLANCO),
        ((73.5, 44.6, 100, 55.6), BLANCO), ((13, 61.5, 29.5, 70), BLANCO), ((7, 79.5, 29.5, 88.2), BLANCO),
        ((15, 89.5, 34, 98.8), BLANCO), ((93, 84, 100, 100), BLANCO)]),
    'V1-03': (14, 200, (172, 137, 450, 435), [((24.5, 52.3, 44.5, 60.6), BLANCO), ((76, 52, 98.5, 61), BLANCO)]),
    'V1-04': (19, 200, (122, 140, 610, 418), [
        ((2.5, 20.5, 12.5, 27.5), 'fondo'), ((35.5, 29.5, 47.5, 35.5), 'fondo'), ((52.5, 0.5, 84, 6.5), 'fondo'),
        ((73.9, 14.5, 91, 25.5), 'fondo'), ((83.5, 31, 100, 37.5), 'fondo'), ((53, 36.5, 68.5, 47.5), 'fondo'),
        ((51.5, 52.5, 59.3, 58.5), 'fondo'), ((89.3, 47.5, 100, 60), 'fondo'), ((43.5, 72.5, 66.2, 78.5), 'fondo'),
        ((65.8, 81.5, 78.5, 87.5), 'fondo'), ((83.3, 80.5, 100, 98.5), 'fondo'), ((11.5, 86.5, 24.5, 92), 'fondo')]),
    'V1-05': (21, 200, (130, 265, 600, 418), []),
    'V1-06': (22, 200, (150, 282, 610, 452), []),
    'V1-07': (23, 200, (140, 172, 595, 405), []),
    'V1-08': (24, 200, (150, 168, 612, 448), []),
    'V1-09': (25, 200, (140, 178, 585, 420), []),
    'V1-10': (26, 200, (140, 158, 605, 442), []),
    # Imágenes de apoyo (no forman parte del inventario visual V1-xx)
    'A1-01': (8, 300, (412, 182, 643, 423), [
        ((55, 3, 83, 11.5), BLANCO), ((62, 15, 79, 20.5), BLANCO), ((3.5, 27, 25.5, 35.5), BLANCO),
        ((74, 26, 98, 35.5), BLANCO), ((74, 41, 92, 49.5), BLANCO), ((21.5, 43.5, 35.5, 49.5), BLANCO),
        ((3.5, 56, 25.5, 63.5), BLANCO), ((63.3, 60.5, 80, 65.5), BLANCO), ((26.5, 62, 46.3, 70.5), BLANCO),
        ((6.5, 79.5, 47.5, 84.5), BLANCO), ((62.5, 90.5, 94, 96.5), BLANCO)]),
    'A1-02': (9, 200, (135, 118, 640, 400), []),
    'A1-03': (11, 200, (248, 243, 620, 432), []),
    'A1-04': (17, 200, (110, 95, 452, 355), []),
    'A1-05': (15, 200, (112, 258, 478, 448), []),
    'A1-06': (15, 300, (484, 192, 627, 288), []),
    'X1-05': (20, 300, (428, 131, 625, 296), []),
}


# Texto "fantasma" (transparencia del reverso en el escaneo): se pasa a blanco todo píxel claro y
# poco saturado, salvo en las cajas protegidas (% del recorte), p. ej. la bujía metálica.
LIMPIAR_FANTASMA = {'V1-02': [(41, 3, 53, 21)]}


def limpiar_fantasma(img, protegidas):
    W, H = img.size
    px = img.load()
    for y in range(H):
        for x in range(W):
            if any(W * a / 100 <= x <= W * c / 100 and H * b / 100 <= y <= H * d / 100 for a, b, c, d in protegidas):
                continue
            r, g, b = px[x, y]
            if max(r, g, b) - min(r, g, b) < 45 and (r + g + b) / 3 > 105:
                px[x, y] = (255, 255, 255)


def render(pagina, ppp, carpeta):
    base = os.path.join(carpeta, f'p{pagina}_{ppp}')
    subprocess.run(['pdftoppm', '-r', str(ppp), '-png', '-singlefile', '-f', str(pagina), '-l', str(pagina), PDF, base], check=True)
    return Image.open(base + '.png').convert('RGB')


def main():
    os.makedirs(SALIDA, exist_ok=True)
    cache = {}
    with tempfile.TemporaryDirectory() as tmp:
        for ident, (pag, ppp, caja, blanqueos) in IMAGENES.items():
            if (pag, ppp) not in cache:
                cache[(pag, ppp)] = render(pag, ppp, tmp)
            k = ppp / 60
            img = cache[(pag, ppp)].crop(tuple(int(v * k) for v in caja))
            W, H = img.size
            d = ImageDraw.Draw(img)
            for (x0, y0, x1, y1), color in blanqueos:
                if color == 'fondo':
                    color = img.getpixel((int(W * 0.30), int(H * 0.62)))
                d.rectangle([W * x0 / 100, H * y0 / 100, W * x1 / 100, H * y1 / 100], fill=color)
            if ident in LIMPIAR_FANTASMA:
                limpiar_fantasma(img, LIMPIAR_FANTASMA[ident])
            # tamaño máximo razonable para la web
            img.thumbnail((1400, 1400))
            ruta = os.path.join(SALIDA, f'{ident}.jpg')
            img.save(ruta, quality=88, optimize=True)
            print(ident, img.size, os.path.getsize(ruta) // 1024, 'KB')


if __name__ == '__main__':
    main()
