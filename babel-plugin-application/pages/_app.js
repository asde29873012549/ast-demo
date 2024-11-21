import Layout from "@/components/Layout";
import GlobalStyles from "@/styles/globalStyles";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <GlobalStyles />
      <Component {...pageProps} />
    </Layout>
  );
}
