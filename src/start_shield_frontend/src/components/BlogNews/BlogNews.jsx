import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Table, Carousel } from 'react-bootstrap';
import './blogNews.css';
import axios from 'axios';


const BlogNews = () => {
  const [stories, setStories] = useState([]);
  const [storyText, setStoryText] = useState('');
  const [feedback, setFeedback] = useState(0);
  const [fontSize, setFontSize] = useState(14);
  const [newsArticles, setNewsArticles] = useState([]);


  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const apiUrl = process.env.REACT_APP_API_URL;
  

 



  const handleStorySubmit = (e) => {
    e.preventDefault();
    if (storyText) {
      setStories([...stories, { text: storyText, feedback: 0 }]);
      setStoryText('');
    }
  };

  const handleFeedback = (index, rating) => {
    const updatedStories = [...stories];
    updatedStories[index].feedback = rating;
    setStories(updatedStories);
  };
  
 
 
    
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = axios.get(`${apiUrl}?country=us&apiKey=${apiKey}`);
        console.log(response.data); // Optional: Check the structure in the console
        setNewsArticles(response.data.articles || []); // Use empty array if undefined
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, [apiUrl, apiKey]);
  
    
    

  
  return (
    
    <Container className="blog-news">
        <Container className="blog-and-news">
      <h2>Blog and News</h2>
      <Row>
        {newsArticles.map((article, index) => (
          <Col key={index} sm={12} md={6} lg={4} className="mb-4">
            <Card className="news-card">
              {article.urlToImage && (
                <Card.Img variant="top" src={article.urlToImage} alt={article.title} />
              )}
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.description?.substring(0, 200)}...</Card.Text>
                <Button 
                  variant="primary" 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Read More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      console.log(process.env.REACT_APP_API_KEY);
    </Container>
      {/* <h2>Blog and News</h2>

      Latest News
      <section className="section">
        <h3>Latest News</h3>
        <Row>
          <Col md={6}>
            <img src="latest-news.jpg" alt="Latest News" className="section-image" />
            <p>Stay updated with the latest in the insurance and crypto industry...</p>
            <Button variant="primary" href="https://insurance-pub.com" target="_blank">
              Read More
            </Button>
          </Col>
          <Col md={6}>
            <img src="industry-insights.jpg" alt="Industry Insights" className="section-image" />
            <p>Explore in-depth insights and analysis on emerging trends...</p>
            <Button variant="primary" href="https://crypto-pub.com" target="_blank">
              Read More
            </Button>
          </Col>
        </Row>
      </section> */}

      {/* Platform Updates */}
      <section className="section">
        <h3>Platform Updates</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Feature</th>
              <th>Update Description</th>
              <th>Benefits</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2024-10-01</td>
              <td>User Dashboard</td>
              <td>Improved UI and added detailed policy tracking</td>
              <td>Easier navigation and tracking options</td>
            </tr>
            <tr>
              <td>2024-10-15</td>
              <td>Mobile App</td>
              <td>Released a new mobile app for on-the-go management</td>
              <td>Convenience of accessing the platform from mobile devices</td>
            </tr>
          </tbody>
        </Table>
      </section>

      {/* Community Stories */}
      <section className="section community-stories">
        <h3>Community Stories</h3>
        <Carousel>
          {stories.map((story, index) => (
            <Carousel.Item key={index}>
              <p style={{ fontSize: `${fontSize}px` }}>{story.text}</p>
              <div className="feedback">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    onClick={() => handleFeedback(index, i + 1)}
                    className={story.feedback > i ? 'star filled' : 'star'}
                  >
                    ★
                  </span>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Story Form */}
        <Form onSubmit={handleStorySubmit}>
          <Form.Group controlId="storyText">
            <Form.Label>Share Your Story</Form.Label>
            <Form.Control
              as="textarea"
              value={storyText}
              onChange={(e) => setStoryText(e.target.value)}
              style={{ fontSize: `${fontSize}px` }}
              rows={3}
              placeholder="Write your story here..."
              required
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Submit Story
          </Button>
          <div className="font-resize">
            <Button variant="secondary" onClick={() => setFontSize(fontSize + 2)}>+</Button>
            <Button variant="secondary" onClick={() => setFontSize(fontSize - 2)}>-</Button>
          </div>
        </Form>
      </section>
    </Container>
  );
};


export default BlogNews;
