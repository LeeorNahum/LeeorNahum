import { Inter, Roboto_Mono } from 'next/font/google'
import './globals.css'

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const fontMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata = {
  title: 'Leeor Nahum',
  description: 'Electrical and Computer Engineer | Software Developer | Entrepreneur',
  metadataBase: new URL('https://leeornahum.com'),
  openGraph: {
    title: 'Leeor Nahum',
    description: 'Electrical and Computer Engineer | Software Developer | Entrepreneur',
    url: 'https://leeornahum.com',
    siteName: 'Leeor Nahum',
    type: 'website',
    images: [
      {
        url: '/preview-image.png', // Replace with your actual filename
        width: 1200,
        height: 630,
        alt: 'Leeor Nahum - Electrical and Computer Engineer | Software Developer | Entrepreneur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leeor Nahum',
    description: 'Electrical and Computer Engineer | Software Developer | Entrepreneur',
    images: ['/preview-image.png'], // Replace with your actual filename
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Remove problematic attributes that might be added by browser extensions
                function cleanupAttributes() {
                  const problematicAttrs = ['cz-shortcut-listen', 'vsc-initialized', 'data-lt-installed'];
                  problematicAttrs.forEach(attr => {
                    if (document.body.hasAttribute(attr)) {
                      document.body.removeAttribute(attr);
                    }
                    if (document.documentElement.hasAttribute(attr)) {
                      document.documentElement.removeAttribute(attr);
                    }
                  });
                }
                
                // Set theme styles - default to dark mode for SSR consistency
                try {
                  const stored = localStorage.getItem('theme');
                  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const isDark = stored ? stored === 'dark' : systemDark;
                  
                  document.documentElement.style.setProperty('--scrollbar-thumb', isDark ? '#373743' : '#BCBCC8');
                  document.body.style.backgroundColor = isDark ? '#09090b' : '#f4f4f6';
                  document.body.style.color = isDark ? '#ffffff' : '#0b0b0f';
                } catch (e) {
                  // Fallback to dark mode to match SSR
                  document.body.style.backgroundColor = '#09090b';
                  document.body.style.color = '#ffffff';
                  document.documentElement.style.setProperty('--scrollbar-thumb', '#373743');
                }
                
                // Clean up immediately
                cleanupAttributes();
                
                // Watch for extension interference
                const observer = new MutationObserver(function(mutations) {
                  mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes') {
                      const problematicAttrs = ['cz-shortcut-listen', 'vsc-initialized', 'data-lt-installed'];
                      if (problematicAttrs.includes(mutation.attributeName)) {
                        mutation.target.removeAttribute(mutation.attributeName);
                      }
                    }
                  });
                });
                
                observer.observe(document.body, { attributes: true });
                observer.observe(document.documentElement, { attributes: true });
              })();
            `,
          }}
        />
      </head>
      <body
        className={`min-h-screen font-sans antialiased ${fontSans.variable} ${fontMono.variable}`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  )
}
