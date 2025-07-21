import Header from "@/components/dashboard/Header";

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (    
      <>            
        <Header />
          {children}        
      </>    
  );
}