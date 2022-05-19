from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)

#CORS Setup
CORS(app)

# # TRAINING MODEL AT STARTUP

# Imports and basic setup for machine learning
import pandas as pd
df = pd.read_csv('train.txt',sep=';')
#getting rid of null values
df = df.dropna()
#Taking a 30% representative sample
import numpy as np
np.random.seed(34)
df1 = df.sample(frac = 0.3)
big_vocab = {}

#extracting all available emotions
emotions = []
for emo in df1['emotion']:
  if emo not in emotions:
    emotions.append(emo)
# print(emotions)

#Adding the sentiments column
df1['sentiments'] = df1.emotion.apply(lambda x: 0 if x in ['sadness', 'anger', 'fear'] else 1)
# df1.head()

# IMPLEMENTING COUNT VECTORIZER

# putting words in set for index identification
def custom_fit(data):
  countVectorizer = set()
  for sentence in data: #df1["entry"]
    # print(sentence)
    for word in sentence.split(' '):
      if len(word)>=2: #for ignoring 'is', 'am', separators, etc
        countVectorizer.add(word)

  # to get index of word
  vocab = {}
  for index, word in enumerate(sorted(countVectorizer)):
    vocab[word] = index

  # DEEP COPYING TRAINED DATA VOCABULARY for reuse in case of testing
  import copy
  global big_vocab
  big_vocab = copy.deepcopy(vocab)

  return vocab

from collections import Counter
from scipy.sparse import csr_matrix

# Converting sentences to sparse matrixes
# function for training
def custom_transform(data):
  vocab = custom_fit(data)
  row,col,val = [],[],[]


  for idx, sentence in enumerate(data):
    count_word = dict(Counter(sentence.split(' ')))

    # check words with vocab
    for word, count in count_word.items():
      if len(word) >= 2:
        col_index = vocab.get(word)
        if col_index >=0:
          row.append(idx)
          col.append(col_index)
          val.append(count)

  # converting to sparse matrix
  return (csr_matrix((val,(row, col)), shape=(len(data),len(vocab))))

#test_transform for testing model
def test_transform(data):
  # using deepcopy of trained vectorized data
  vocab = big_vocab # using data array generated from training
  row,col,val = [],[],[]
  for idx, sentence in enumerate(data):
    count_word = dict(Counter(sentence.split(' ')))
    for word, count in count_word.items():
      if word is None: # in case where proposed word does not exist in trained set
        continue
      elif len(word) >= 2:
        col_index = vocab.get(word)
        if col_index is None:
          continue
        elif col_index >= 0:
          row.append(idx)
          col.append(col_index)
          val.append(count)

  return (csr_matrix((val,(row, col)), shape=(len(data),len(vocab))))

# Data pre-process
X = (df1['entry'])
y = df1['sentiments']

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split( X, y, 
                                        test_size = 0.5, random_state=24)

# Vectorizing the text data
ctmTr = custom_transform(X_train)
X_test_dtm = test_transform(X_test)


# Using Logistic regression implementation from sklearn library
from sklearn.linear_model import LogisticRegression
lr = LogisticRegression()
lr.fit(ctmTr, y_train)
#Accuracy score
lr_score = lr.score(X_test_dtm, y_test)
print("Results for Logistic Regression with CountVectorizer")
print(lr_score)
#Predicting the labels for test data
y_pred_lr = lr.predict(X_test_dtm)
from sklearn.metrics import confusion_matrix
#Confusion matrix
cm_lr = confusion_matrix(y_test, y_pred_lr)
tn, fp, fn, tp = confusion_matrix(y_test, y_pred_lr).ravel()
print('confusion matrix:')
print(tp, fp)
print(fn, tn)
print()
# True positive and true negative rates
tpr_lr = round(tp/(tp + fn), 4)
tnr_lr = round(tn/(tn+fp), 4)
print(tpr_lr, tnr_lr)

# MODEL ENDS HERE

# NAMED ENTITY RECOGNITION

# Importing nltk for NAMED ENTITY RECOGNITION

import nltk
# Required imports for NER for nltk
# nltk.download('punkt')
# nltk.download('averaged_perceptron_tagger')
# nltk.download('maxent_ne_chunker')
# nltk.download('words')

def recognize(inp):
    #tokenizing words
    words = nltk.word_tokenize(inp)

    #tagging every word
    pos_tags = nltk.pos_tag(words)
    # print(pos_tags)

    # identifying entities and their respective labels
    words=[]

    for entity,label in pos_tags:
        if label in ['NE','NN','NNP']:
            words.append({"entity":entity,"lable":label})
            
    return words

# function to return the sentiment and word list predicted
def prediction(val):
    in2 = [val]
    in3 = test_transform(in2)
    out = lr.predict(in3)
    if (out==1):
        return 'Positive'
    else:
        return 'Negative'

# Server-side coding for Required network connections

# '/' Home route for prototype testing
@app.route('/')
def hello_world():
    return 'Hello, World!'

# '/predict' route for getting predictions from our machine learning model
@app.route('/predict', methods=['GET','POST'])
def predict():
    if request.method == 'POST':
        req = request.json["data"]
        data = {}
        data["sentiment"] = prediction(req)
        data["words"] = recognize(req)
        return data
    return 'done predicting'

# Activation code for establishing connection
if __name__ == "__main__":
    app.run(debug=True, port=8888)
