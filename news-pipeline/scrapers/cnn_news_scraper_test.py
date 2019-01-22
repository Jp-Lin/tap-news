import cnn_news_scraper as scraper

EXPECTED_NEWS = "It was a moment in a bigger story that is still unfolding."
CNN_NEWS_URL = "https://www.cnn.com/2019/01/21/us/maga-hat-teens-native-american-second-video/index.html"

def test_basic():
    news = scraper.extract_news(CNN_NEWS_URL)

    print news
    assert EXPECTED_NEWS in news
    print('test passed!')

if __name__ == "__main__":
    test_basic()