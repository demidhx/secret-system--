#!flask/bin/python
import os, sys
from flask import Flask, jsonify, request
from LFSR import LFSR_get_message
from LFSR import LFSR_get_miwen
from LFSR import LFSR_get_mingwen
from LFSR import LFSR_jiami
from LFSR import LFSR_jiemi
from RC4 import RC4_get_message
from RC4 import RC4_get_miwen
from RC4 import RC4_jiami
from RC4 import RC4_jiemi
from RSA import rsa_get_message
from RSA import rsa_get_miwen
from RSA import rsa_get_jiemi
from RSA import rsa_get_p
from RSA import rsa_get_q
from RSA import rsa_get_en
from RSA import rsa_get_e
from RSA import rsa_get_d
from RSA import RSA_encryption
from RSA import RSA_decryption
from Affine import Affine_get_message
from Affine import Affine_get_miwen
from Affine import Affine_get_decryptmw
from Affine import Affine_encrypt
from Affine import Affine_decrypt
from DES import DES_get_message
from DES import DES_get_miwen
from DES import DES_get_decryptmw
from DES import DES_get_key
from DES import DES_get_IV
from DES import DES_encrypt
from DES import DES_decrypt
from RSA2 import RSA_encryption,RSA_decryption
from RC4_DH import RC4_encryption,RC4_decryption
from DiffieHellman import DiffieHellman
from DH_3 import Encryption,Decryption,ret0,ret1,ret2,ret3,ret4,ret5,ret6,ret7,ret8,ret9,ret10,ret11,ret12


import binascii
import binhex
import hashlib

from flask_cors import *

app = Flask(__name__)
CORS(app,resources=r'/*')


interface_path = os.path.dirname(__file__)
sys.path.insert(0, interface_path)  # 将当前文件的父目录加入临时系统变量


# @app.route('/up', methods=['get'])
# def index():
#     return '<form action="/upload" method="post" enctype="multipart/form-data"><input type="file" id="img" name="img"><button type="submit">上传</button></form>'

@app.route('/upload', methods=['post'])#获取前端传来的上传文件
def upload():
    fname = request.files['file']  # 获取上传的文件
    if fname:
        # t = time.strftime('%Y%m%d%H%M%S')
        new_fname = r'static/' + fname.filename
        fname.save(new_fname)  # 保存文件到指定路径
        return '<img src=%s>' % new_fname
    else:
        return '{"msg": "请上传文件！"}'


@app.route('/LFSR_obv', methods=['GET'])#获取明文
def LFSR_obv():
    return jsonify(LFSR_get_message())


@app.route('/LFSR_sec', methods=['GET'])#获取密文
def LFSR_sec():
    LFSR_jiami()
    return jsonify(LFSR_get_miwen())


@app.route('/LFSR_obv1', methods=['GET'])#获取解密后的明文
def LFSR_obv1():
    LFSR_jiemi()
    return jsonify(LFSR_get_mingwen())


@app.route('/RC4_sec', methods=['GET'])#RC4密文
def RC4_obv():
    RC4_jiami()
    return jsonify(RC4_get_miwen())


@app.route('/RC4_obv', methods=['GET'])#RC4解密后明文
def RC4_sec():
    RC4_jiemi()
    return jsonify(RC4_get_message())


@app.route('/RSAobv', methods=['GET'])#RSA明文
def rsa_mingwen():
    return jsonify(rsa_get_message())


@app.route('/RSAsec', methods=['GET'])
def rsa_miwen():
    RSA_encryption()
    return jsonify(rsa_get_miwen())


@app.route('/RSAobv1', methods=['GET'])#RSA解密后的明文
def rsa_jiemi():
    RSA_decryption()
    return jsonify(rsa_get_jiemi())


@app.route('/rsa_p', methods=['GET'])
def rsa_p():
    return jsonify(rsa_get_p())


@app.route('/rsa_q', methods=['GET'])
def rsa_q():
    return jsonify(rsa_get_q())


@app.route('/rsa_en', methods=['GET'])
def rsa_en():
    return jsonify(rsa_get_en())


@app.route('/rsa_e', methods=['GET'])
def rsa_e():
    return jsonify(rsa_get_e())


@app.route('/rsa_d', methods=['GET'])
def rsa_d():
    return jsonify(rsa_get_d())


@app.route('/Affine_obv', methods=['GET'])#明文
def Affine_mingwen():
    return jsonify(Affine_get_message())


@app.route('/Affine_sec', methods=['GET'])#密文
def Affine_miwen():
    Affine_encrypt()
    return jsonify(Affine_get_miwen())


@app.route('/Affine_decryptmw', methods=['GET'])#解密后的明文
def Affine_decryptmw():
    Affine_decrypt()
    return jsonify(Affine_get_decryptmw())


@app.route('/DES_obv', methods=['GET'])#明文
def DES_mingwen():
    return jsonify(DES_get_message())


@app.route('/DES_sec', methods=['GET'])#密文
def DES_miwen():
    DES_encrypt()
    return jsonify(DES_get_miwen())


@app.route('/DES_obv1', methods=['GET'])#解密后的明文
def DES_decryptmw():
    DES_decrypt()
    return jsonify(DES_get_decryptmw())


#DH认证模块接口
@app.route('/DH_Bob_pubkey', methods=['GET'])  # Bob的DH公钥
def DH_Bob_pubkey():
    bob=str(ret0())
    return jsonify(bob)


@app.route('/DH_Alice_pubkey', methods=['GET'])  # Alice的DH公钥
def DH_Alice_pubkey():
    alice=str(ret1())
    return jsonify(alice)


@app.route('/DH_Authen_key', methods=['GET'])  # Alice的协商共享密钥
def DH_Authen_key():
    aliceKey=ret2()
    return jsonify(aliceKey)


@app.route('/DH_digital', methods=['GET'])  # 数字签名
def DH_digital():
    message = ret4()
    return jsonify(message)


@app.route('/DH_split', methods=['GET'])  # 拼接后的明文
def DH_split():
    message = ret5()
    return jsonify(message)


@app.route('/DH_encry', methods=['GET'])  # RC4加密后的密文
def DH_encry():
    message = ret6()
    return jsonify(message)


@app.route('/DH_decry', methods=['GET'])  # RC4解密后的明文
def DH_decry():
    message = ret7()
    return jsonify(message)


@app.route('/DH_message2', methods=['GET'])  # 消息最后解密后的原文
def DH_emessage2():
    message = ret8()
    return jsonify(message)


@app.route('/DH_hashre', methods=['GET'])  # 消息最后解密后的数字签名
def DH_hashre():
    message = ret9()
    return jsonify(message)

@app.route('/DH_hashre1', methods=['GET'])
def DH_hashre1():
    message = ret12()
    return jsonify(message)


@app.route('/DH_e', methods=['GET'])  #
def DH_e():
    message = ret10()
    return jsonify(message)


@app.route('/DH_d', methods=['GET'])  #
def DH_d():
    message = ret11()
    return jsonify(message)


@app.route('/')
def hello_world():
    return 'hello world'


@app.route('/registerP', methods=['POST']) #从前端获得的明文
def registerP():
    te=request.form.get('Mingwen')
    fo = open('DH_message.txt', 'w')
    fo.write(te)
    fo.close()
    Encryption()
    Decryption()
    return jsonify('0')


if __name__ == '__main__':
    app.run(debug=True)
    # app.run(host='10.69.180.163', port=5000, debug=True)
