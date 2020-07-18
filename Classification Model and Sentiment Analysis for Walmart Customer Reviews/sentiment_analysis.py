import pandas as pd
import csv
import nltk
from nltk.tokenize import word_tokenize
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import re
import random
from nltk.corpus import stopwords
from sklearn.naive_bayes import MultinomialNB
from nltk.classify.scikitlearn import SklearnClassifier
import json
import matplotlib.pyplot as plt
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, quote, unquote
from time import sleep,time
from random import randint
from pandas.io.json import json_normalize
import numpy as np

print("-"*100)
print("|             CLASSIFICATION MODEL AND SENTIMENT ANALYSIS OF WALMART CUSTOMER REVIEWS              |")
print("|                                           WELCOME                                                |")
print("-"*100)

reviews_df = pd.read_csv("./product_reviews.csv")
reviews = reviews_df[['id', 'reviews.rating', 'reviews.text', 'reviews.title']]
print("The total number of records are:", reviews.count()['id'])

total_reviews = reviews.count()['id']
reviews.head()

polarity = []

#Extracting all the product reviews and ratings
for index, row in reviews.head(n=total_reviews).iterrows():
    score = 0
    
    #If rating is greater than 3 then consider it as positive review otherwise consider it as negative
    if row['reviews.rating'] > 3:
        score = 1
    polarity.append(score)
    
reviews['polarity'] = polarity
reviews.head()

records = []
all_words = []
allowed_pos = ['JJ'] #Consider the words which are adjective

#Remove the words which don't have relevance like ['they', 'I', 'was']
stop_words = list(set(stopwords.words("english"))) 

for index, row in reviews.head(n=total_reviews).iterrows():
    records.append((row['reviews.text'], row['polarity']))
    review = str(row['reviews.text'])
    
    #Clean words are any words lowecase and uppercase but no numbers
    clean_words = re.sub('[^a-zA-Z\s]','', review.lower())
    #Convert sentence into list of words
    tokenize_words = word_tokenize(clean_words)
    #Return the words if it is not in stopwords list
    stopped_words = [word for word in tokenize_words if word not in stop_words]
    #Assign parts of speech to each word
    tagged_words = nltk.pos_tag(stopped_words)
    #Append the word into list if it is an adjective
    for word in tagged_words:
        if word[1] in allowed_pos:
            all_words.append(word[0])

#Select the 2000 most frequently repeated words as bag of words
BOW = nltk.FreqDist(all_words)
word_features = list(BOW.keys())[:2000]

feature = {}

#Tokenize each sentence and check if the tokenized words are present in bag of words and return a json object
def find_feature(data):
    tokenized_words = word_tokenize(data)
    for word in word_features:
        feature[word] = (word in tokenized_words)
    return feature
	
features_set = []

#Create a json object for each review to check whether the adjectives in the review are present or not in the bag of words 
#and append them into a list
for (review, polarity) in records:
    review_object = json.dumps(find_feature(str(review)))
    features_set.append((review_object, polarity)) 

training_set = []
y = []

for i in range(0,len(features_set)):
    training_set.append(json.loads(features_set[i][0]))
    y.append(features_set[i][1])

x_train = pd.DataFrame.from_dict(json_normalize(training_set), orient='columns')
y_train = pd.DataFrame({'result': y})

print("The total number of records in training dataset are:", x_train.count()[0])
x_train.head()

model_NB = MultinomialNB()
model_NB.fit(x_train, y_train, 5)

testing_df = pd.read_csv('./test_reviews.csv')
testing_reviews = testing_df[['id', 'reviews.rating', 'reviews.text', 'reviews.title']]

polarity = []

total_reviews_tesing = testing_reviews.count()[0]

for index, row in testing_reviews.head(n=total_reviews_tesing).iterrows():
    review = row['reviews.text']
    score = 0
    if row['reviews.rating'] > 3:
        score = 1
    polarity.append(score)
    
testing_reviews['polarity'] = polarity

print("The total number of records in testing dataset are:", testing_reviews.count()['id'])
testing_reviews.head()

records_test = []

for index, row in testing_reviews.head(n=total_reviews_tesing).iterrows():
    records_test.append((row['reviews.text'], row['polarity']))
    
testing_set = []

for (review, polarity) in records_test:
    obj = json.dumps(find_feature(str(review)))
    testing_set.append((obj, polarity))
	
x = []
y = []

for i in range(0,len(testing_set)):
    x.append(json.loads(testing_set[i][0]))
    y.append(testing_set[i][1])
    
x_test = pd.DataFrame.from_dict(json_normalize(x), orient='columns')
y_test = pd.DataFrame({'result': y})


print("The total number of records in testing dataset are:", x_test.count()[0])
x_test.head()

y_prediction = model_NB.predict(x_test)

#Determine the accuracy of the model by calculating the mean of all values for which the predicted value is equal to the 
#actual value
count = np.mean(y_prediction == y)*100

positive = 0
negative = 0

for i in range(0, len(y_prediction)):
    if y_prediction[i] == 1:
        positive += 1
    else:
        negative += 1
        
print("The accuracy of Multimodial Naive Bayes Model is:", round(count, 2), "%")  


#User prompt to add products for comparison
print("-"*100)
print("|                                           WELCOME                                                |")
print("-"*100)
products = []
product_name = input("Enter the product name: ")
products.append(product_name)

while product_name:
    prompt = input("Do you want to compare it with another product: ")
    if prompt.lower() == 'yes':
        product_name = input("Enter the product you want to compare: ")
        products.append(product_name)
    else:
        break
print("-"*100)

#Web Scraping all the user entered products from Walmart
headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0", 
           "Accept-Encoding":"gzip, deflate",     
           "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", 
           "DNT":"1","Connection":"close", "Upgrade-Insecure-Requests":"1"}

products_reviews = []

for search_item in products:
    search_item = quote(search_item)
    walmart_url = 'https://www.walmart.com/search/?query='+search_item
    walmart_response = requests.get(url=walmart_url, headers=headers).content
    soup = BeautifulSoup(walmart_response)

    contents = soup.find_all('a', attrs={'class': 'product-title-link'})
    reviews = []

    for content in contents:
        link = content.get('href')
        product_link = urljoin(walmart_url, link)
        product = requests.get(url=product_link, headers=headers).content
        product = BeautifulSoup(product)
        #To avoid simultaneous request of multiple products
        sleep(randint(2,8))
        if product.find('a', attrs={'data-tl-id': 'ProductPage-see_all_reviews'}):
            link = product.find('a', attrs={'data-tl-id': 'ProductPage-see_all_reviews'}).get('href')
            all_reviews_link = urljoin(walmart_url, link)
            product_reviews = requests.get(url=all_reviews_link, headers=headers).content
            product_reviews = BeautifulSoup(product_reviews)
            
            #capture all the reviews which have class as 'review-description' for div tag
            #Currently review-description class is used but it can change in future, in that case find the class
            all_reviews = product_reviews.find_all('div', attrs={'class':'review-description'})
            for fetch_reviews in all_reviews:
                review = fetch_reviews.find('p')
                if review:
                    reviews.append(review.string)
    
    json_obj = {}
    json_obj['productName'] = search_item
    json_obj['reviews'] = reviews
    
    products_reviews.append(json.dumps(json_obj))
	
sia = SentimentIntensityAnalyzer()
products_document = []
polarity_scores_test = []
document_final = []

for product in products_reviews:
    json_obj = json.loads(product)
    reviews = json_obj['reviews']
    for row in reviews:
        pol_score = sia.polarity_scores(row)
        score = 0
        #If the value of compound score id greater than 0.4 then consider it as positive review otherwise consider it as
        #negative
        if pol_score['compound'] >= 0.4:
            score = 1
        document_final.append((row, score))
    
    element = {
        'productName': json_obj['productName'],
        'document_final': document_final
    }
    products_document.append(json.dumps(element))
	
products_features = []

for product in products_document:
    element = json.loads(product)
    document_final = element['document_final']
    productName = element['productName']
    
    features = []

    for (review, polarity) in document_final:
        json_obj = json.dumps(find_feature(str(review)))
        features.append((json_obj, polarity))
    
    json_obj = {
        'productName': productName,
        'features': features
    }
    
    products_features.append(json.dumps(json_obj)) 

y_test_reviews = []

for product in products_features:
    element = json.loads(product)
    productName = element['productName']
    features = element['features']
    
    x = []
    y = []
    
    for row in features:
        x.append(json.loads(row[0]))
        y.append(row[1])
    
    if len(x) > 0:
        x_reviews_test = pd.DataFrame.from_dict(json_normalize(x), orient="columns")
        y_result = model_NB.predict(x_reviews_test)
    
        positive = 0
        negative = 0

        for i in range(0, len(y_result)):
            if y_result[i] == 1:
                positive += 1
            else:
                negative += 1

        count = np.mean(y_result == y)*100
        
        positive_percentage = (positive/(positive+negative))*100
        negative_percentage = (negative/(positive+negative))*100

        element = {
            'productName': productName,
            'positive': positive_percentage,
            'negative': negative_percentage,
        }

        y_test_reviews.append(json.dumps(element))


negative = []
positive = []
names = []

#Aggregating all products positive and negative reviews
for product in y_test_reviews:
    product = json.loads(product)
    negative.append(product['negative'])
    positive.append(product['positive'])
    names.append(unquote(product['productName'].upper()))
    
ticks =  list(range(0, len(y_test_reviews)))

plt.figure(figsize=(15,9))
plt.bar(ticks, positive, edgecolor='white', label='positive', width=0.5)
plt.bar(ticks, negative, bottom = positive, edgecolor='white', label='negative', width=0.5)
plt.xticks(ticks, names, rotation=30)
plt.xlabel('Products', fontSize=20, fontweight='bold')
plt.ylabel('No. of reviews', fontSize=20, fontweight='bold')
plt.legend(fontsize=12, loc='upper right')
plt.title('Total number of Positive and Negative reviews for User selected products', fontsize=24, fontweight="bold")

plt.show()