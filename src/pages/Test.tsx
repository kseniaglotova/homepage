import './Test.css'

export function Test() {
const images: string[] = [
  "/moped-test.jpg",
  "motorrad-bild.jpg",
  "/motorrad-bild2.jpg",
  "/homepage-background.jpg",  
];

const repeatedImages: string[] = [...images, ...images];

const images2: string[] = [
  "/food/bowl.jpg",
  "/food/pizza1.jpg",
];

const repeatedImages2: string[] = [...images2, ...images2];

const images3: string[] = [
  "/oldpics/estonia-beach.jpg",
  "/oldpics/gymnastics.jpg",
  "/oldpics/towel.JPG",
];

const repeatedImages3: string[] = [...images3, ...images3];

const images4: string[] = [
  "/places/cassis-sea.jpg",
  "/places/france-cassis.jpg",
  "/places/moskau-city.jpg",
  "/places/moskau.jpg",
  "/places/sankt-petersburg.jpg",
];

const repeatedImages4: string[] = [...images4, ...images4];



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
          Hier sind Bilder, welche endlos durchlaufen.
        </p>
      </div>

      <div className="image-rail" aria-label="Scrolling image gallery">
        <div className="image-track">
          {repeatedImages2.map((image, index) =>
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

      <div className="image-rail" aria-label="Scrolling image gallery">
        <div className="image-track">
          {repeatedImages3.map((image, index) =>
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

      <div className="image-rail" aria-label="Scrolling image gallery">
        <div className="image-track">
          {repeatedImages4.map((image, index) =>
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

    </div>
    
  )
}