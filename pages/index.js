import { useState, useEffect } from 'react';
import Head from 'next/head';
import AdminModal from '../components/Home/AdminModal';

export default function Home() {
  const [showAdminModal, setShowAdminModal] = useState(false);

  const handleCtaClick = () => {
    window.open('https://wa.me/5543996284678?text=Ol%C3%A1!%20Gostaria%20de%20saber%20sobre%20os%20Convites%20Digitais.', '_blank');
  };

  return (
    <>
      <Head>
        <title>Convites Digitais - Crie Convites Únicos</title>
        <meta name="description" content="Transforme seus eventos em experiências únicas com convites digitais elegantes e personalizados" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="home-container">
        {/* Background fluido animado */}
        <div className="fluid-background">
          <div className="fluid-shape shape-1"></div>
          <div className="fluid-shape shape-2"></div>
          <div className="fluid-shape shape-3"></div>
          <div className="fluid-shape shape-4"></div>
          <div className="fluid-shape shape-5"></div>
        </div>

        {/* Overlay de gradiente */}
        <div className="gradient-overlay"></div>

        {/* Header */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 40px',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: 'white',
            letterSpacing: '0.1em'
          }}>
            CONVITES PRO
          </div>

          <button
            onClick={() => setShowAdminModal(true)}
            style={{
              background: 'rgba(20, 20, 20, 0.8)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              color: 'white',
              padding: '10px 20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(30, 30, 30, 0.9)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(20, 20, 20, 0.8)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            Admin
          </button>
        </header>

        {/* Hero Section */}
        <main style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 40px',
          minHeight: 'calc(100vh - 140px)',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: '700',
              lineHeight: 1.1,
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.8) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em'
            }}>
              Crie Convites Digitais Para Qualquer Ocasião
            </h1>

            <p style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.3rem)',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '40px',
              maxWidth: '600px',
              margin: '0 auto 40px auto',
              lineHeight: 1.6
            }}>
              Transforme seus eventos em experiências únicas com convites digitais elegantes e personalizados
            </p>

            <button
              onClick={handleCtaClick}
              style={{
                background: 'white',
                color: '#000',
                padding: '16px 32px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 30px rgba(255, 255, 255, 0.2)';
                e.target.style.background = 'rgba(255, 255, 255, 0.95)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 20px rgba(255, 255, 255, 0.1)';
                e.target.style.background = 'white';
              }}
            >
              Faça seu convite
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer style={{
          padding: '20px 40px',
          textAlign: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
          zIndex: 10
        }}>
          <p style={{
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '14px',
            margin: 0
          }}>
            2025 Todos Direitos Reservados a @kevbarroz
          </p>
        </footer>

        {/* Modal Admin */}
        <AdminModal 
          isOpen={showAdminModal} 
          onClose={() => setShowAdminModal(false)} 
        />
      </div>

      <style jsx>{`
        .home-container {
          min-height: 100vh;
          background: #0a0a0a;
          color: #ffffff;
          position: relative;
          overflow: hidden;
        }

        .fluid-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          overflow: hidden;
        }

        .fluid-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.7;
          animation: fluidMove 20s ease-in-out infinite;
        }

        .shape-1 {
          width: 400px;
          height: 400px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          top: -200px;
          left: -200px;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 300px;
          height: 300px;
          background: linear-gradient(45deg, #f093fb, #f5576c);
          top: 20%;
          right: -150px;
          animation-delay: -5s;
        }

        .shape-3 {
          width: 500px;
          height: 500px;
          background: linear-gradient(45deg, #4facfe, #00f2fe);
          bottom: -250px;
          left: 10%;
          animation-delay: -10s;
        }

        .shape-4 {
          width: 250px;
          height: 250px;
          background: linear-gradient(45deg, #43e97b, #38f9d7);
          top: 60%;
          right: 20%;
          animation-delay: -15s;
        }

        .shape-5 {
          width: 350px;
          height: 350px;
          background: linear-gradient(45deg, #fa709a, #fee140);
          top: 10%;
          left: 30%;
          animation-delay: -7s;
        }

        .gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(240, 147, 251, 0.1) 0%, transparent 50%);
          z-index: 2;
        }

        @keyframes fluidMove {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          25% {
            transform: translate(30px, -50px) rotate(90deg) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) rotate(180deg) scale(0.9);
          }
          75% {
            transform: translate(50px, 30px) rotate(270deg) scale(1.05);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        * {
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .fluid-shape {
            filter: blur(60px);
          }
          
          .shape-1 {
            width: 300px;
            height: 300px;
          }
          
          .shape-2 {
            width: 200px;
            height: 200px;
          }
          
          .shape-3 {
            width: 350px;
            height: 350px;
          }
          
          .shape-4 {
            width: 180px;
            height: 180px;
          }
          
          .shape-5 {
            width: 250px;
            height: 250px;
          }
        }
      `}</style>
    </>
  );
}