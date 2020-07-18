# Classification Model and Sentiment Analysis for Walmart Customer Reviews

***Used a Multinomial Naive Bayes Classifier to classify the Walmart Customer Reviews as positive and negative for multiple products which eliminates the need of browsing through each product and weighing the reviews as positive and negative.***

### To run the files:

1. Recommended to use Jupyter Notebook: Open the ```.ipynb``` file in browser.
2. If you want to run it on Linux/Windows command prompt then follow the below steps:
```
$ cd /SentimentAnalysis
$ python -W ignore sentiment_analysis.py
```

### Output

1. On running the above command, you will get the following output:

```
C:\Users\Bhakti\web_scrapping_project>python -W ignore sentiment_analysis.py
----------------------------------------------------------------------------------------------------
|             CLASSIFICATION MODEL AND SENTIMENT ANALYSIS OF WALMART CUSTOMER REVIEWS              |
|                                           WELCOME                                                |
----------------------------------------------------------------------------------------------------
The total number of records are: 28332
The total number of records in training dataset are: 28332
The total number of records in testing dataset are: 5000
The total number of records in testing dataset are: 5000
The accuracy of Multimodial Naive Bayes Model is: 94.2 %
```

2. Then, you will be prompted to enter the name of the product. If you want to compare the current product with some other product then type **"yes"** otherwise type **"no"**
**Example:** I entered the product Samsung S20 and I wanted to compare it with iphone XS and iphone 11

```
----------------------------------------------------------------------------------------------------
|                                           WELCOME                                                |
----------------------------------------------------------------------------------------------------
Enter the product name: Samsung S20
Do you want to compare it with another product: yes
Enter the product you want to compare: iphone XS
Do you want to compare it with another product: yes
Enter the product you want to compare: iphone 11
Do you want to compare it with another product: no
----------------------------------------------------------------------------------------------------
```

On entering the product names, customer reviews will be scraped from Walmart and plot will be displayed showing the total number of positive and negative reviews for each product.

**Recommended:** Add only 10 products at a time, in order to get good visualization plot for comparison.

### Implementation of Multinomial Naive Bayes Classifier

1. The dataset used is 'product_reviews.csv' which is downloaded from Kaggle.
2. The reviews from the dataset are classified as positive or negative by using the sentiment analysis tool called VADER
3. Each reviews from the dataset are cleaned, tokenized and the stopwords like ['they', 'is', 'I', 'was'] are removed with the help of 'nltk' library.
4. The words are further filtered out to consider the words which are adjectives and the most frequently repeated 2000 words are considered for training the model.
5. A training set is developed by iterating through reviews and checking if the reviews contain the word from the 2000 words that were filtered out.
6. Once trained, the model is tested by using the 'test_reviews.csv' dataset which was downloaded from Kaggle as well and the steps 2 - 5 are repeated to prepare a testing dataset.

***The accuracy of the Multinomial Naive Bayes classifier is 94.2%***

## Classification of Walmart Customer Reviews:

1. User is prompted to enter the name of the products and the customer reviews for those products is scrapped from Walmart using "BeautifulSoup"
2. The reviews are processed and tested using the classifier.
3. The bar chart is generated to show the total number of positive and negative reviews for all products.
