import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider} from '@/components/ui/sidebar';
import {Home, BookOpen, GraduationCap} from 'lucide-react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Career Compass',
  description: 'Find your ideal career path with AI-powered suggestions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <h2 className="text-lg font-bold">Career Compass</h2>
              <p className="text-sm text-muted-foreground">
                AI Powered Career Guidance
              </p>
            </SidebarHeader>
            
            
              
                
                  
                    
                      
                      
                    
                  
                
                
                  
                    
                      
                      
                    
                  
                
                
                  
                    
                      
                      
                    
                  
                
              
            
            <SidebarFooter>© 2024 Career Compass</SidebarFooter>
          </Sidebar>
          <SidebarContent>{children}</SidebarContent>
        </SidebarProvider>
      </body>
    </html>
  );
}

