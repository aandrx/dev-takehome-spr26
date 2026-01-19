'use client'

import { useState } from 'react'

export default function Kewl() {
  const [selectedPost, setSelectedPost] = useState<number | null>(null)
  
  // Sample data with placeholder images
  const posts = [
    { id: 1, src: '/placeholder-1.jpg', alt: 'Creative coding project', description: 'Building unique web experiences' },
    { id: 2, src: '/placeholder-2.jpg', alt: 'Design exploration', description: 'Experimenting with visual layouts' },
    { id: 3, src: '/placeholder-3.jpg', alt: 'Portfolio showcase', description: 'My latest portfolio design' },
    { id: 4, src: '/placeholder-4.jpg', alt: 'Code snapshot', description: 'Clean, functional code' },
    { id: 5, src: '/placeholder-5.jpg', alt: 'UI Components', description: 'Reusable component library' },
    { id: 6, src: '/placeholder-6.jpg', alt: 'Mobile responsive', description: 'Mobile-first development' },
    { id: 7, src: '/placeholder-1.jpg', alt: 'Animation work', description: 'Smooth micro-interactions' },
    { id: 8, src: '/placeholder-2.jpg', alt: 'Database design', description: 'Efficient data architecture' },
    { id: 9, src: '/placeholder-3.jpg', alt: 'API development', description: 'RESTful API design' },
    { id: 10, src: '/placeholder-4.jpg', alt: 'Testing suite', description: 'Comprehensive test coverage' },
    { id: 11, src: '/placeholder-5.jpg', alt: 'Performance optimization', description: 'Lightning fast loading' },
    { id: 12, src: '/placeholder-6.jpg', alt: 'Collaboration tools', description: 'Team workflow optimization' },
    { id: 13, src: '/placeholder-1.jpg', alt: 'Creative coding', description: 'Experimental interfaces' },
    { id: 14, src: '/placeholder-2.jpg', alt: 'Open source', description: 'Contributing to community' },
    { id: 15, src: '/placeholder-3.jpg', alt: 'Learning journey', description: 'Always growing skills' },
    { id: 16, src: '/placeholder-4.jpg', alt: 'More creative work', description: 'Continuing innovation' },
    { id: 17, src: '/placeholder-5.jpg', alt: 'Team projects', description: 'Collaborative development' },
    { id: 18, src: '/placeholder-6.jpg', alt: 'Latest designs', description: 'Fresh creative concepts' },
    { id: 19, src: '/placeholder-1.jpg', alt: 'Code experiments', description: 'Pushing boundaries' },
    { id: 20, src: '/placeholder-2.jpg', alt: 'Future projects', description: 'What\'s coming next' },
  ]

  const openModal = (postId: number) => {
    setSelectedPost(postId)
  }

  const closeModal = () => {
    setSelectedPost(null)
  }

  const selectedPostData = posts.find(post => post.id === selectedPost)

  return (
    <>
      <style jsx global>{`
        /* Base body and html styles matching aandrx.github.io */
        html, body {
          overflow-x: auto !important;
          overflow-y: hidden !important;
          width: fit-content;
          min-width: 100vw;
          font-family: helvetica, arial, sans-serif;
          font-weight: 300;
          font-size: 8pt;
          line-height: 16pt;
          color: #000;
          background: #fff;
          margin: 0;
          padding: 0;
        }
        
        /* Layout system matching project-six-layout */
        .project-six-layout {
          width: fit-content;
          min-width: 100vw;
          height: 100vh;
          overflow-x: auto;
          overflow-y: hidden;
          display: flex;
          flex-direction: row;
          position: relative;
        }
        
        /* Container matching exact aandrx.github.io structure */
        #container {
          padding: 40px 40px 90px 280px;
          
          --ig-gap: 4px;
          --ig-height: calc(calc(100vh - 130px) - calc(16pt + 1px + 2.75rem));
          --ig-usable: calc(var(--ig-height) - (2 * var(--ig-gap)));
          --ig-cell: calc(var(--ig-usable) / 3);
          
          width: calc(240px + 40px + (12 * var(--ig-cell)) + (11 * var(--ig-gap)) + 40px);
          min-width: calc(240px + 40px + (12 * var(--ig-cell)) + (11 * var(--ig-gap)) + 40px);
          
          position: static;
          height: auto;
          min-height: 100vh;
          
          overflow: visible;
          background: #fff;
          color: #000;
          font-family: helvetica, arial, sans-serif;
          font-size: 8pt;
          line-height: 16pt;
          opacity: 1;
          box-sizing: border-box;
          
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        
        /* Post container */
        .post {
          position: relative;
          width: 100%;
          height: auto;
        }
        
        /* Info section */
        .post .info {
          width: 100%;
          height: calc(16pt + 1px + 2.75rem);
          min-height: calc(16pt + 1px + 2.75rem);
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          clear: both;
          position: relative;
        }
        
        .post .info .title.section {
          font-size: 9.5pt;
          font-weight: 300;
          letter-spacing: 0;
          margin: 1px 0 2.75rem 0;
          color: #000;
          font-family: Arial, sans-serif;
        }
        
        /* Content area */
        .post .content {
          width: 240px;
          float: left;
          margin-right: 40px;
          color: #000;
          font-family: helvetica, arial, sans-serif;
          font-size: 8pt;
          line-height: 16pt;
          box-sizing: border-box;
          overflow: visible;
        }
        
        .post .content p {
          margin: 0 0 16pt 0;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
        
        /* Instagram Grid */
        .instagram-grid-full-height {
          display: grid;
          grid-template-rows: repeat(3, var(--ig-cell));
          grid-auto-flow: column;
          grid-auto-columns: var(--ig-cell);
          gap: var(--ig-gap);
          height: var(--ig-height);
          width: fit-content;
          position: absolute;
          top: calc(16pt + 1px + 2.75rem);
          left: calc(240px + 40px);
          margin-right: 40px;
        }
        
        .instagram-grid-item-full {
          cursor: pointer;
          overflow: hidden;
          position: relative;
          width: var(--ig-cell);
          height: var(--ig-cell);
          background: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .instagram-grid-image {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          object-position: center !important;
          display: block !important;
          transition: opacity 0.2s ease;
          flex-shrink: 0;
          max-width: 100% !important;
          max-height: 100% !important;
        }
        
        .instagram-grid-item-full:hover .instagram-grid-image {
          opacity: 0.8;
        }
        
        .instagram-post-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.2s ease;
          pointer-events: none;
        }
        
        .instagram-grid-item-full:hover .instagram-post-overlay {
          opacity: 1;
          background: rgba(0, 0, 0, 0.3);
        }
        
        .overlay-content {
          color: white;
          text-align: center;
        }
        
        .post-number {
          font-size: 14px;
          font-weight: bold;
        }
        
        /* Clear fix */
        .clear {
          clear: both;
        }
        
        /* Modal system matching aandrx.github.io */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
        }
        
        .modal-content {
          background: white;
          border-radius: 8px;
          max-width: 90vw;
          max-height: 90vh;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        }
        
        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: none;
          border-radius: 50%;
          width: 2.5rem;
          height: 2.5rem;
          font-size: 1.5rem;
          cursor: pointer;
          z-index: 1001;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
        }
        
        .modal-close:hover {
          background: rgba(0, 0, 0, 0.9);
        }
        
        .modal-image-container {
          position: relative;
          max-width: 600px;
          max-height: 600px;
        }
        
        .modal-image {
          width: 100%;
          height: auto;
          display: block;
        }
        
        .modal-info {
          padding: 1.5rem;
        }
        
        .modal-info h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.2rem;
          color: #000;
        }
        
        .modal-info p {
          margin: 0;
          color: #666;
          line-height: 1.4;
        }
        
        /* Mobile responsive */
        @media (max-width: 768px) {
          html, body {
            overflow-x: hidden !important;
            overflow-y: auto !important;
            width: 100vw;
            min-width: 100vw;
          }
          
          .project-six-layout {
            width: 100vw;
            min-width: 100vw;
            height: auto;
            min-height: 100vh;
            overflow-x: hidden;
            overflow-y: visible;
            display: block;
            flex-direction: column;
          }
          
          #container {
            padding: 80px 20px 40px 20px !important;
            width: 100vw !important;
            min-width: 100vw !important;
            max-width: 100vw !important;
          }
          
          .post {
            position: static;
            width: 100%;
          }
          
          .post .content {
            width: 100% !important;
            float: none;
            margin-right: 0;
            margin-bottom: 20px;
          }
          
          .instagram-grid-full-height {
            position: static !important;
            width: 100% !important;
            height: auto !important;
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            grid-template-rows: auto !important;
            grid-auto-flow: row !important;
            gap: 4px !important;
            margin-right: 0 !important;
            left: auto !important;
            top: auto !important;
          }
          
          .instagram-grid-item-full {
            width: 100% !important;
            height: 0 !important;
            padding-bottom: 100% !important;
            position: relative;
          }
          
          .instagram-grid-image {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
          }
        }
      `}</style>
      
      <div className="project-six-layout">
        <div id="container" className="ie">
          <div className="post">
            <div className="info">
              <div className="title section">Creative Portfolio Feed</div>
              <div className="clear"></div>
            </div>
            
            <div className="content">
              <p>This is a unique horizontal Instagram-style grid I created for my portfolio! 
              It flows horizontally across the entire page, creating an immersive scrolling experience.</p>
              <p>Instead of traditional scrollbars, the entire page scrolls horizontally to reveal more content. 
              Each square maintains perfect proportions while filling the available height.</p>
              <p>The grid extends infinitely to the right, with the newest content appearing first. 
              As you scroll, you journey through the collection in a cinematic flow.</p>
              <p>Scroll horizontally to explore the full grid, or click on any image to view it in detail. 
              This type of layout really makes portfolios stand out from the crowd! 🎨✨</p>
            </div>

            {/* Instagram Grid that spans the full post height */}
            <div className="instagram-grid-full-height">
              {posts.map((post) => (
                <div 
                  key={post.id} 
                  className="instagram-grid-item-full"
                  onClick={() => openModal(post.id)}
                >
                  <div className="instagram-post-overlay">
                    <div className="overlay-content">
                      <span className="post-number">#{post.id}</span>
                    </div>
                  </div>
                  {/* Using a placeholder colored div instead of Image for now */}
                  <div 
                    className="instagram-grid-image"
                    style={{
                      background: `linear-gradient(45deg, 
                        hsl(${(post.id * 30) % 360}, 70%, 60%), 
                        hsl(${(post.id * 30 + 60) % 360}, 70%, 70%)
                      )`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                      fontSize: '18px'
                    }}
                  >
                    {post.id}
                  </div>
                </div>
              ))}
            </div>

          </div>
          <div className="clear"></div>
        </div>

        {/* Modal for viewing individual posts */}
        {selectedPost && selectedPostData && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>
              <div className="modal-image-container">
                <div 
                  className="modal-image"
                  style={{
                    height: '400px',
                    background: `linear-gradient(45deg, 
                      hsl(${(selectedPostData.id * 30) % 360}, 70%, 60%), 
                      hsl(${(selectedPostData.id * 30 + 60) % 360}, 70%, 70%)
                    )`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '48px',
                    fontWeight: 'bold',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                  }}
                >
                  #{selectedPostData.id}
                </div>
              </div>
              <div className="modal-info">
                <h3>{selectedPostData.alt}</h3>
                <p>{selectedPostData.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
