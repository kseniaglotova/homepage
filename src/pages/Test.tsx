import './Test.css'

const images: string[] = [
  "/moped-test.jpg",
  "motorrad-bild.jpg",
  "/motorrad-bild2.jpg",
  "/homepage-background.jpg",
  
];
export function Test() {
  const repeatedImages: string[] = [...images, ...images];

  return (
    <div className="test-layout">
      <div className="image-rail" aria-label="Scrolling image gallery">
        <div className="image-track">
          {repeatedImages.map((image, index) =>
            (
              <img
                key={index} 
                src={image} 
                alt={"Index: "+index} 
               />
            )
          )}
        </div>
      </div>


      <div className="test-text">
        <h2>Test Page</h2>
        <p>
          Hier läuft eine Bildliste vertikal und endlos durch. Links stehen die Bilder
          in einer langen Spalte, rechts ein einfacher Textblock.
        </p>
      </div>
    </div>
  )
}