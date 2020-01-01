#!/usr/bin/env python
#coding=utf-8
import binascii
#import DES_code
import DiffieHellman
from RSA2 import RSA_encryption,RSA_decryption
from RC4_DH import RC4_encryption,RC4_decryption
#from DES_code import DES_encryption,DES_decryption
from DiffieHellman import DiffieHellman
import hashlib

#修改私钥！ 源码见DH_2
#DH协商密钥

a = DiffieHellman(group=5,keyLength=256)
b = DiffieHellman(group=5,keyLength=256)


a.genKey(b.publicKey)
b.genKey(a.publicKey)       

if(a.getKey() == b.getKey()):
	#print("密钥协商完成")
	#print("Key:", binascii.b2a_hex(a.key).decode('utf-8')) #字符串转ascii hexlify('abc') 　　  # '616263'
	with open("RC4_key.txt", "w")as f:
		f.write(binascii.b2a_hex(a.key).decode('utf-8'))

'''
以下是接口函数
'''
def ret0():
	return b.publicKey

def ret1():
	return a.publicKey

def ret2():
	return binascii.b2a_hex(a.key).decode('utf-8')


def ret3():
	with open('DH_message.txt','r',encoding='utf-8') as f:
		DH_message=f.read()
	a=DH_message.encode('utf-8').decode('unicode_escape')
	return a

def ret4():
	with open('digital_signature.txt','r')as f:
		digital_signature=f.read()#获取数字签名
	return digital_signature

def ret5():
	with open('split.txt','r') as f:
		m=f.read()
	return m

def ret6():
	with open("RC4_encryption.txt","r")as f:
		m=f.read()
	return m

def ret7():
	with open("RC4_decryption.txt","r")as f:
		m=f.read()
	return m

def ret8():
	with open('DH_message2.txt','r')as f:
		m=f.read()
	return m

def ret9():
	with open('DH_hash_re.txt','r')as f:
		m=f.read()
	return m

def ret10():
	with open('e.txt','r')as f:
		m=f.read()
	return m

def ret11():
	with open('d.txt','r')as f:
		m=f.read()
	return m

def ret12():
	with open('DH_hash_re1.txt','r')as f:
		m=f.read()
	return m

'''
以上是接口函数
'''


'''
	with open("RC4_key.txt","w")as f:
		f.write(binascii.b2a_hex(a.key).decode('utf-8'))
		'''

#加密过程
#读取明文
def Encryption():
	with open('DH_message.txt','r',encoding='utf-8') as f:
		DH_message=f.read()
	#生成hash值并且写入文件
	DH_hash=hashlib.sha256()
	DH_hash.update(DH_message.encode('utf-8'))
	with open('DH_hash.txt','w')as f:
		f.write(DH_hash.hexdigest())
	#生成数字签名
	RSA_encryption('DH_hash.txt','digital_signature.txt')
	print('明文加密成功')
	#数字签名和消息拼接
	with open('split.txt','wb') as f:
		f.write(DH_message.encode())#写入消息的二进制


	with open('digital_signature.txt','r')as f:
		digital_signature=f.read()#获取数字签名

	with open('split.txt','a+') as f: #
		#f.write(digital_signature)#写入数字签名
		f.write("\n"+digital_signature)
	#加密拼接信息
	RC4_encryption()
	print("拼接信息加密成功")



def Decryption():
	#解密如下
	#DH协商密钥后 一会接入


	#解密信息成消息和散列函数
	RC4_decryption()
	print("拼接信息解密成功")

	#拆分获得消息和数字签名的方法
	with open('split.txt','rb') as f:
		content=f.read().splitlines()#写入消息的二进制
	print('消息本身：',content[0].decode())
	print('数字签名：',content[1].decode())
	#第一段是消息 第二段是数字签名
	remessage=content[0].decode()
	SH=content[1].decode()

	with open('DH_message2.txt','w')as f:
		f.write(remessage)
	#XIAXIA
	with open('digital_signature2.txt','w')as f:
		f.write(SH)

	DH_rehash=hashlib.sha256()
	DH_rehash.update(remessage.encode('utf-8'))
	RSA_decryption('digital_signature2.txt','DH_hash_re.txt')
	#RSA_decryption('digital_signature.txt','DH_hash_re.txt')
	with open('DH_hash_re.txt','r')as f:
		test=f.read()
	print('数字签名验证如下：')
	rash=DH_rehash.hexdigest()
	with open('DH_hash_re1.txt','w')as f:
		f.write(rash)
	if(test==rash):
		print('ok')
	else:
		print('test:',test)
		print('DH_rehash:',DH_rehash.hexdigest())



if __name__ == '__main__':

	Encryption()
	Decryption()



