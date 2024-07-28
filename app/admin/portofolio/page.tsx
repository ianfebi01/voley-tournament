import Header from "@/components/Layouts/Header";
import Portofolio from "@/components/Pages/Portofolio";
import { PortofolioProvider } from "@/context/PortofolioContext";

export default function PortofolioPage(  ) {
	
  return (
    <div className="flex flex-col gap-6 overflow-scroll h-full">
      <Header text='Portofolio'/>
      <PortofolioProvider>
        <Portofolio/>
      </PortofolioProvider>
    </div> 
  )
}
