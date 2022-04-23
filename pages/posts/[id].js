import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import {useRouter} from 'next/router'
import { useEffect } from 'react'




export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}
export async function getStaticPaths() {
  // [{ params: { id: pre-rendering}}, ...]
  const paths = getAllPostIds();
    // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return {
    paths,
    fallback: false // getStaticPath 에서 주지 않은 id는 404로 처리한다.
  }
}
export default function Post({ postData }) {
  const router = useRouter();

  useEffect(()=>{
    const getText = async () => {
      const res = await fetch('/api/hello')
      const data = await res.json()
    }
    getText()
  },[])

  if(router.isFallback){
    return <div>Loading....</div>;
  }
  return (
    <Layout>
      <Head>
        <title>{postData.id}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
    
  )
}