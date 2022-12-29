import Layout from '../../src/components/Layout'
import api from '../../src/utils/api'
import Head from 'next/head'
import Details from '../../src/components/Seminar/Details/Details'

export default function DynamicPage({ seminar }) {
    return (
        <>
            <Head>
				<title>Fikrlar atolyesi</title>
				<meta name="description" content="Fikrlar atolyesi" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

            <Layout>
                <Details slug={seminar.slug} />
            </Layout>
        </>
    )
}

export async function getStaticProps({ params }) {
    const { data } = await api.get('/seminars')
    const { seminars } = data.data

    const seminar = seminars.find(s => s.slug === params.slug)

    return {
        props: { seminar }
    }
}
  
export async function getStaticPaths({ locales }) {
    const { data } = await api.get('/seminars')
    const { seminars } = data.data

    const paths = seminars
                        .map((seminar) => locales.map((locale) => ({
                            params: { slug: seminar.slug },
                            locale
                        })))
                        .flat()

    return { paths, fallback: true }
}