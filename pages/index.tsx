import { useRouter } from "next/router";
import Image from "next/image";
import img from '../public/casey-horner-4rDCa5hBlCs-unsplash.jpg'
export default function Home() {
  const router = useRouter();
  return (
    <main> 
      <button className="bg-sky-400 p-2 " onClick={()=>router.push('/register')}>Register</button>
      <Image
      src={img}
      width={500}
      height={500}
      alt="Picture of the author"
    />
     
    </main>
  );
}
