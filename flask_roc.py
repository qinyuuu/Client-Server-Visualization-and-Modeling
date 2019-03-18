import pandas as pd
import numpy as np

from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS

from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_curve
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import MinMaxScaler

app = Flask(__name__)
CORS(app)

api = Api(app)

class ROC(Resource):
    def get(self, preprocessing, c):

        if(preprocessing == "minmax"):
            scaler = MinMaxScaler()
        elif(preprocessing == "stand"):
            scaler = StandardScaler()
        
        X_train_preprocessed = scaler.fit_transform(X_train)
        X_test_preprocessed = scaler.transform(X_test)
        
        lr = LogisticRegression(C = float(c))
        lr.fit(X_train_preprocessed, y_train)
        
        proba = lr.predict_proba(X_test_preprocessed)
        fprs, tprs, thresholds = roc_curve(y_test, proba[:,1], pos_label = 1)

        dictionarys = []
        for i in range(len(fprs)):
            dictionarys.append({"tpr":tprs[i],"fpr":fprs[i],"threshold": thresholds[i]})
        return dictionarys

api.add_resource(ROC, "/<string:preprocessing>/<float:c>")

if __name__ == '__main__':

    df = pd.read_csv('data/transfusion.data')
    xDf = df.loc[:, df.columns != 'Donated']
    y = df['Donated']

    np.random.seed(1)
    r = np.random.rand(len(df))

    X_train = xDf[r < 0.8]
    X_test = xDf[r >= 0.8]
    y_train = y[r < 0.8]
    y_test = y[r >= 0.8]

app.run(debug=False)