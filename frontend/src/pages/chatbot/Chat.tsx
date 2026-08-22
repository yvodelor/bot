import { useParams} from 'react-router-dom';
import { useEffect, useState} from 'react';
import {ChatWidget} from "../../components/ChatWidget"
import { type Business } from "../../api/business.api";
import PageMeta from "../../components/common/PageMeta";
import  axiosClient from "../../api/axiosClient"


const ChatPage = () => {
  const {slugBusiness} = useParams<{slugBusiness:string}>()
  const[business, setBusiness] = useState<Business | null>(null);
  const[loading, setLoading] = useState(true);

  // Etape 1: On resilve slug -> BusinessId
  
  useEffect(() =>{
    axiosClient.get(`/public/business/by?field=slug&value=${slugBusiness}`)
      .then(res => setBusiness(res.data.data))
      .catch(() => setBusiness(null))
      .finally(() => setLoading(false));
  }, [slugBusiness]);

    

  console.log(business)

  if(loading) return <div className = "h-screen grid place-items-center"> Chargement...</div>;
  if(!business) return <div className = "h-screen grid place-items-center"> Structure Introuvale</div>;

  return(
    <> 
      <PageMeta
        title= {`Echangez avec ${business.name}`}
        description={
          business.description ||
          `Échangez avec ${business.name} grâce à son assistant conversationnel.`
        }
      />

      <div className="h-screen w-screen bg-gray-50">
        <ChatWidget
          tenantId= {business.id}
          title={business.name}
          description={business.description}
          mode='fullscreen'
        />
      </div>
    </>
  );
};

export default ChatPage;