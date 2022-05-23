import Head from 'next/head'
import React, { useState, useEffect } from "react";
import styles from '../styles/Home.module.css'
import ResponseCard from '../components/responseCard';

export default function Home() {
  const [prompt, setPrompt] = useState();
  const [responseCard, setResponseCard] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      alert("Please type something");
    } else {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      })
      const data = await response.json();

      localStorage.setItem("savedResponseCards", JSON.stringify([{ id: data.id, prompt: prompt, response: data.response }, ...responseCard]));

      setResponseCard([{ id: data.id, prompt: prompt, response: data.response }, ...responseCard]);

      setPrompt("");
    }
  }

  function handleClear() {
    localStorage.removeItem('savedResponseCards');
    setResponseCard([]);
  }

  useEffect(() => {
    const localResponseCards = localStorage.getItem("savedResponseCards");
    localResponseCards && setResponseCard(JSON.parse(localResponseCards));
  }, [])

  return (
    <div>
      <Head>
        <title>Fun With GPT-3</title>
        <meta name="og:title" content="Fun With GPT-3" />
        <meta name="description" content="Open AI Response" />
        <meta name="author" content="Zi Wang" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>Fun With AI</h1>
      </header>

      <main>
        <section>
          <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="prompt" className={styles.label}>Enter prompt</label>
            <textarea type="text" id="prompt" name="prompt" className={styles.textarea} value={prompt} onChange={(e) => setPrompt(e.target.value)} minLength="1" required></textarea>
            <button type="submit" className={styles.button}>Submit</button>
          </form>
        </section>

        <section>
          <div className={styles.wrap}>
            <h2>Responses</h2>
            <button onClick={handleClear} className={styles.clearButton}>Clear</button>
          </div>
          <ul className={styles.list}>
            {responseCard.map((item) => {
              return (
                <ResponseCard key={item.id} prompt={item.prompt} response={item.response} />
              )
            })}
          </ul>
        </section>
      </main>
    </div>
  )
}
