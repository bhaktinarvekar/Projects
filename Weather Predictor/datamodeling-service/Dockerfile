FROM python:3

ADD data_modeling.py /

RUN pip install matplotlib
RUN pip install pika
RUN pip install nexradaws
RUN pip install numpy
RUN pip install arm-pyart
RUN pip install netCDF4
RUN pip install scipy
RUN pip install pandas
RUN pip install pymongo

VOLUME ["/plots"]

CMD [ "python", "./data_modeling.py" ]
