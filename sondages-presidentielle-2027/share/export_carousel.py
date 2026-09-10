from pathlib import Path
from PIL import Image
from playwright.sync_api import sync_playwright

HERE = Path(__file__).parent
SRC = (HERE / "carousel.html").resolve().as_uri()
OUT = HERE / "png"
OUT.mkdir(exist_ok=True)
PDF = HERE / "carousel.pdf"

def launch(p):
    for channel in ("msedge", "chrome"):
        try:
            return p.chromium.launch(channel=channel)
        except Exception:
            pass
    return p.chromium.launch()

def main():
    paths = []
    with sync_playwright() as p:
        browser = launch(p)
        page = browser.new_page(viewport={"width": 1200, "height": 1400}, device_scale_factor=2)
        page.goto(SRC)
        page.wait_for_timeout(400)
        for index, slide in enumerate(page.query_selector_all(".slide"), 1):
            path = OUT / f"slide-{index:02d}.png"
            slide.screenshot(path=str(path))
            paths.append(path)
            print(f"[PNG] {path.name}")
        browser.close()
    images = [Image.open(path).convert("RGB") for path in paths]
    images[0].save(PDF, save_all=True, append_images=images[1:], resolution=150)
    print(f"[PDF] {PDF.name} ({len(images)} pages)")

if __name__ == "__main__":
    main()
