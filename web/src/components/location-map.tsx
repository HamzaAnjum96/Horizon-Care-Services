'use client'

import { useEffect, useRef } from 'react'

const LAT = 53.5077
const LNG = -2.2408
const TILE_URL = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'

// Inline the logo path so we can use it inside Leaflet's DivIcon HTML
const LOGO_PATH = `M 543.6 923.2 L 484.9 923.2 L 483.8 922.1 L 464.6 921.0 L 463.5 919.8 L 456.7 919.8 L 455.6 918.7 L 431.9 915.3 L 401.4 907.4 L 372.1 897.3 L 350.7 888.3 L 313.4 869.1 L 279.6 847.6 L 248.0 823.9 L 219.8 799.1 L 198.9 778.3 L 173.0 748.9 L 151.5 720.7 L 121.1 672.2 L 107.5 645.1 L 96.3 618.1 L 80.5 567.3 L 75.9 543.6 L 74.8 528.9 L 73.7 527.8 L 72.6 493.9 L 71.4 492.8 L 74.8 448.8 L 79.3 426.3 L 88.4 398.1 L 92.9 386.8 L 110.9 352.9 L 129.0 329.2 L 149.8 308.4 L 183.7 284.7 L 199.5 276.8 L 223.2 267.7 L 246.9 262.1 L 264.9 261.0 L 266.1 259.8 L 303.3 261.0 L 327.0 265.5 L 348.4 272.3 L 363.1 277.9 L 390.2 291.4 L 425.1 314.0 L 469.1 350.1 L 515.4 396.4 L 550.4 360.3 L 581.9 332.1 L 612.4 308.4 L 642.9 289.2 L 673.3 274.5 L 704.9 264.4 L 723.0 261.0 L 730.9 261.0 L 732.0 259.8 L 769.2 259.8 L 770.4 261.0 L 778.3 261.0 L 796.3 264.4 L 814.4 270.0 L 851.6 288.1 L 877.5 307.2 L 898.4 328.1 L 919.8 358.6 L 927.7 373.2 L 936.8 394.7 L 943.5 416.1 L 948.1 436.4 L 950.3 460.1 L 951.4 461.2 L 951.4 475.9 L 952.6 477.0 L 951.4 517.6 L 950.3 518.8 L 949.2 537.9 L 948.1 539.1 L 944.7 562.8 L 939.0 585.3 L 928.9 615.8 L 913.1 653.0 L 888.3 698.2 L 858.9 739.9 L 827.3 777.1 L 799.7 804.8 L 779.4 822.8 L 754.6 842.0 L 729.7 858.9 L 694.8 879.2 L 692.5 879.2 L 663.2 893.9 L 642.9 900.7 L 639.5 902.9 L 595.5 915.3 L 565.0 919.8 L 563.9 921.0 L 544.7 922.1 L 543.6 923.2 Z M 772.1 581.9 L 790.7 579.1 L 806.5 572.4 L 816.6 565.6 L 828.5 553.7 L 834.1 545.8 L 842.0 527.8 L 845.4 513.1 L 845.4 504.1 L 846.5 503.0 L 846.5 483.8 L 845.4 482.7 L 844.3 466.9 L 840.9 452.2 L 834.1 434.2 L 827.3 421.7 L 816.1 405.9 L 799.7 390.7 L 789.5 383.9 L 761.3 372.7 L 746.7 371.5 L 745.5 370.4 L 717.3 371.5 L 689.1 379.4 L 662.1 393.0 L 635.0 412.2 L 603.4 440.4 L 578.0 466.9 L 591.5 482.7 L 636.1 526.1 L 660.9 545.3 L 684.6 559.9 L 708.3 571.2 L 728.6 578.0 L 745.5 581.4 L 755.7 581.4 L 756.8 582.5 L 772.1 581.9 Z M 530.6 816.6 L 566.2 812.7 L 603.4 803.6 L 639.5 790.1 L 680.1 768.7 L 710.6 747.2 L 732.0 729.2 L 764.2 695.9 L 782.2 673.3 L 792.4 657.5 L 774.9 664.9 L 759.1 668.3 L 752.3 668.3 L 751.2 669.4 L 717.3 669.4 L 716.2 668.3 L 707.2 668.3 L 684.6 663.7 L 645.1 650.2 L 614.7 634.4 L 592.1 619.7 L 548.1 584.8 L 502.4 539.1 L 439.2 466.9 L 407.6 433.0 L 382.3 409.9 L 357.4 391.8 L 330.4 378.3 L 315.7 373.8 L 303.3 372.7 L 302.2 371.5 L 278.5 371.5 L 262.7 374.9 L 250.3 379.4 L 232.2 389.6 L 220.9 398.6 L 206.8 413.8 L 197.8 427.4 L 191.0 440.9 L 186.5 453.3 L 182.0 472.5 L 179.7 505.2 L 180.9 506.4 L 182.0 531.2 L 185.4 549.2 L 197.8 591.0 L 217.0 632.7 L 238.4 667.7 L 267.7 704.9 L 296.5 733.7 L 329.2 759.6 L 364.2 781.1 L 399.2 796.9 L 444.3 810.4 L 455.6 811.5 L 462.4 813.8 L 469.1 813.8 L 470.3 814.9 L 478.2 814.9 L 479.3 816.1 L 492.8 816.1 L 493.9 817.2 L 530.6 816.6 Z`

const MARKER_HTML = `
<div style="display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 2px 8px rgba(0,0,0,0.22));">
  <div style="
    width:42px;height:42px;border-radius:50%;
    background:oklch(97% 0.006 52);
    border:2px solid oklch(67% 0.13 40);
    display:flex;align-items:center;justify-content:center;
    padding:9px;box-sizing:border-box;
  ">
    <svg viewBox="0 0 1024 1024" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
      <path fill="oklch(67% 0.13 40)" fill-rule="evenodd" clip-rule="evenodd" d="${LOGO_PATH}"/>
      <circle cx="511.4" cy="201.7" r="99.6" fill="oklch(67% 0.13 40)"/>
    </svg>
  </div>
  <div style="width:2px;height:8px;background:oklch(67% 0.13 40);margin-top:-1px;"></div>
  <div style="width:5px;height:5px;border-radius:50%;background:oklch(67% 0.13 40);margin-top:-1px;"></div>
</div>
`

export function LocationMap() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    let destroyed = false
    let mapInstance: { remove: () => void } | null = null

    const cssEl = document.createElement('link')
    cssEl.rel = 'stylesheet'
    cssEl.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(cssEl)

    const jsEl = document.createElement('script')
    jsEl.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    jsEl.onload = () => {
      if (destroyed || !containerRef.current) return
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const L = (window as any).L

      const map = L.map(containerRef.current, {
        center: [LAT, LNG],
        zoom: 15,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: false,
      })
      mapInstance = map

      L.tileLayer(TILE_URL, { subdomains: 'abcd', maxZoom: 19 }).addTo(map)

      // Minimal dark attribution
      L.control.attribution({ prefix: false, position: 'bottomleft' })
        .addAttribution('<span style="opacity:0.3;font-size:9px">© OpenStreetMap · © CARTO</span>')
        .addTo(map)

      const icon = L.divIcon({
        className: '',
        html: MARKER_HTML,
        iconSize: [42, 57],
        iconAnchor: [21, 57],
      })

      L.marker([LAT, LNG], { icon }).addTo(map)
    }

    document.head.appendChild(jsEl)

    return () => {
      destroyed = true
      mapInstance?.remove()
      if (document.head.contains(cssEl)) document.head.removeChild(cssEl)
    }
  }, [])

  return (
    <div className="w-full h-full relative">
      <div
        ref={containerRef}
        className="w-full h-full"
        aria-label="Map showing Horizon Care Services office location"
        style={{ filter: 'sepia(18%) saturate(70%) brightness(103%)' }}
      />
    </div>
  )
}
