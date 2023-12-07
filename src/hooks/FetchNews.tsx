import { useEffect, useState } from 'react';
import axios, {AxiosError} from 'axios';
const ApiKey = 'YOUR_API_HERE';
const url = 'https://newsapi.org/v2/everything';

interface Article {
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    author:string;
    content:string;
    publishedAt:string;
  }


  

const FetchNews = (topic?: string) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [Error, setError] = useState("");
     
  
  useEffect(() => {
   
 
        const fetchNews = async () => {
          try {
            setError("");
            setLoading(true);
            const response = await axios.get(url, {
              params: {
                q: topic || 'tesla',
                from: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                sortBy: 'publishedAt',
                apiKey: ApiKey,
              },
            });
    
            setArticles(response.data.articles);
            setLoading(false);
          } 
          catch (error: unknown) {
            setLoading(false);
            setError((error as AxiosError).message);
        } 
        };
    
        fetchNews();
      }, [topic]);
    
    
    




return {articles, loading, Error};
};

export default FetchNews;
