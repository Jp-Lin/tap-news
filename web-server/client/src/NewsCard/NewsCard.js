 import React from 'react';
 import './NewsCard.css';
import Auth from '../Auth/Auth';

 class NewsCard extends React.Component {
     redirectToUrl(url) {
         this.sendClickLog();
         window.open(url, '_blank');
     }

     sendClickLog() {
         const url = 'http://localhost:3000/news/userId/' + Auth.getEmail()
         + '/newsId/' + this.props.news.digest;

         const request = new Request(encodeURI(url), {
             method: 'POST',
             cache: 'no-cache',
             headers: {
                 'Authentication': 'bearer ' + Auth.getToken()
             },
         });
         fetch(request);
     }

     render() {
         return (
             <div className="news-container">
                <div className="row">
                    <div className='col s4 fill'>
                       <img src={this.props.news.urlToImage} alt='news'/>
                    </div>
                    <div className="col s8">
                        <div className="news-intro-col">
                            <div className="news-intro-panel">
                                <h4 onClick={() => this.redirectToUrl(this.props.news.url)}>{this.props.news.title}</h4>
                                <div className="news-description">
                                    <p>{this.props.news.description}</p>
                                    <p className="news-time">{this.props.news.publishedAt}</p>
                                    <div>
                                        {this.props.news.source != null && <div className='chip light-blue news-chip'>{this.props.news.source.name}</div>}
                                        {this.props.news.reason != null && <div className='chip light-green news-chip'>{this.props.news.reason}</div>}
                                        {this.props.news.time != null && <div className='chip amber news-chip'>{this.props.news.time}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>                    
                    </div>
                </div>
            </div>                
         );
     }
 }

 export default NewsCard;