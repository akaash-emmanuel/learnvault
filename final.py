from flask import Flask, request, jsonify
from flask_cors import CORS  
import requests
from bs4 import BeautifulSoup
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)  

# YouTube API configuration
YOUTUBE_API_KEY = "AIzaSyBvOYeok1MPuBNG22LtIs-YUlN1XLKtJyY"
YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search"


#function to fetch yt vids
def fetch_youtube_videos(query, max_results=10):
    params = {
        "part": "snippet",
        "q": query,
        "type": "video",
        "maxResults": max_results,
        "key": YOUTUBE_API_KEY
    }
    response = requests.get(YOUTUBE_SEARCH_URL, params=params)
    print(f"API Response Status Code: {response.status_code}")
    print(f"API Response Content: {response.json()}")
    if response.status_code == 200:
        videos = response.json().get("items", [])
        return [
            {
                "title": video["snippet"]["title"],
                "description": video["snippet"]["description"],
                "url": f"https://www.youtube.com/watch?v={video['id']['videoId']}"
            }
            for video in videos
        ]
    else:
        print(f"Error fetching YouTube videos: {response.json()}")
        return []


# function to crawl web pages
def crawl_web(query, max_results=10):
    search_url = f"https://www.google.com/search?q={query.replace(' ', '+')}&num={max_results}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    response = requests.get(search_url, headers=headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")
        results = []
        for item in soup.find_all("div", class_="tF2Cxc", limit=max_results):
            title = item.find("h3").text if item.find("h3") else "No Title"
            url = item.find("a")["href"] if item.find("a") else "No URL"
            snippet = item.find("span", class_="aCOpRe").text if item.find("span", class_="aCOpRe") else "No Description"
            description = snippet  
            results.append({"title": title, "url": url, "snippet": snippet, "description": description})
        return results
    else:
        print("Error crawling the web.")
        return []


def rank_results(query, results):
    """Ranks results based on TF-IDF and cosine similarity."""
    vectorizer = TfidfVectorizer()
    documents = [result['title'] + ' ' + result['description'] for result in results]
    X = vectorizer.fit_transform(documents)
    query_vector = vectorizer.transform([query])
    similarity_scores = cosine_similarity(query_vector, X).flatten()

    for result, score in zip(results, similarity_scores):
        result['similarity_score'] = score

    ranked_results = sorted(results, key=lambda x: x['similarity_score'], reverse=True)
    return ranked_results


@app.route('/api/search', methods=['POST'])
def search():
    data = request.get_json()
    query = data.get('query')
    search_type = data.get('type')
    print(f"Received query: {query}, search type: {search_type}")  

    max_results = data.get('max_results', 10)
    print(f"Query: {query}, Search Type: {search_type}")

    results = {"visual": [], "web": []}

    if search_type in ["visual", ""]:
        results["visual"] = fetch_youtube_videos(query, max_results)
        print(f"Visual results: {results['visual']}")
    if search_type in ["web", ""]:
        results["web"] = crawl_web(query, max_results)

    if results["web"]:
        results["web"] = rank_results(query, results["web"])

    print(f"Results: {results}")
    return jsonify({"results": results})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)  
