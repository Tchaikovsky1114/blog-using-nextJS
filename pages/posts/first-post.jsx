import Head from 'next/head'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../../components/layout'

export default function FirstPost() {
  const router = useRouter();
  useEffect(()=>{
    router.push("/posts/first-post/?counter=10",undefined,{ shallow: true })
  },[])

  useEffect(()=>{
    alert(router.query.counter)
  },[router.query.counter])
  return (
    
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      
    <main>hi my name is Eremes Kim</main>
    <p>really joyful learning</p>
    
    </Layout>
  )
}