from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)

#CORS Setup
CORS(app)

# from helpers.model import train
# from helpers.model import prediction
import pandas as pd
df = pd.read_csv('amazon_baby.csv', engine=None, encoding='utf8')
#getting rid of null values
df = df.dropna()
#Taking a 30% representative sample
import numpy as np
np.random.seed(34)
df1 = df.sample(frac = 0.3)
#Adding the sentiments column
df1['sentiments'] = df1.rating.apply(lambda x: 0 if x in [1, 2, 3] else 1)

X = df1['review']
y = df1['sentiments']

from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, 
                                        test_size = 0.5, random_state=24)
from sklearn.feature_extraction.text import CountVectorizer
cv = CountVectorizer()
#Vectorizing the text data
ctmTr = cv.fit_transform(X_train)
X_test_dtm = cv.transform(X_test)
from sklearn.linear_model import LogisticRegression
#Training the model
lr = LogisticRegression(max_iter=20000)
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
print(tn, fp, fn, tp)
#True positive and true negative rates
tpr_lr = round(tp/(tp + fn), 4)
tnr_lr = round(tn/(tn+fp), 4)
print(tpr_lr, tnr_lr)


def prediction(val):
    in2 = [val]
    in3 = cv.transform(in2)
    out = lr.predict(in3)
    if (out==1):
        return 'Positive'
    else:
        return 'Negative'

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/predict', methods=['GET','POST'])
def predict():
    if request.method == 'POST':
        data = {}
        data["sentiment"] = prediction(request.data)
        return data
    return 'done predicting'

if __name__ == "__main__":
    # ctr = 0
    # if(ctr == 0):
    app.run(debug=True, port=8888)
