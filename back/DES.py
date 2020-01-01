from xml.dom import minidom #导入模块
dom=minidom.parse(r"static/scratch.xml") #打开xml
from pyDes import *
# For Python3, you'll need to use bytes, i.e.:
#  data = b"Please encrypt my data"
#  k = des(b"DESCRYPT", CBC, b"\0\0\0\0\0\0\0\0", pad=None, padmode=PAD_PKCS5)
def DES_get_message():
	ming = dom.getElementsByTagName("mingwen")  # 获取节点列表
	for i in range(len(ming)):
		s = ming[i].firstChild.data  # 打印节点数据
	# #f = open('DES_mingwen.txt', 'r')
	#s = f.read()
	#f.close()
	return s

def DES_get_miwen():
	f = open('DES_encryptmiwen.txt', 'rb')
	s = f.read()
	m = str(s)
	f.close()
	return m

def DES_get_decryptmw():
	f = open('DES_decryptmw.txt', 'r')
	s = f.read()
	m = str(s)
	f.close()
	return m

def DES_get_key():
	k = dom.getElementsByTagName("DES-key")  # 获取节点列表
	for i in range(len(k)):
		s = k[i].firstChild.data  # 打印节点数据
	#f = open('DES_key.txt', 'r')
	#s = f.read()
	#f.close()
	return s

def DES_get_IV():
	k = dom.getElementsByTagName("DES-IV")  # 获取节点列表
	s = k[0].firstChild.data  # 打印节点数据
	#f = open('DES_IV.txt', 'r')
	#s = f.read()
	#f.close()
	return s

def DES_encrypt():
	key1 = DES_get_key()
	mingw = DES_get_message()
	iv = DES_get_IV()
	k = des(key1, CBC, iv , pad=None, padmode=PAD_PKCS5)
	d = k.encrypt(mingw)
	#l=str(d,"utf-8")
	f = open('DES_encryptmiwen.txt', 'wb')
	f.write(d)
	f.close()

def DES_decrypt():
	key1=DES_get_key()
	f = open('DES_encryptmiwen.txt', 'rb')
	miw = f.read()
	f.close()
	iv = DES_get_IV()
	k = des(key1, CBC, iv , pad=None, padmode=PAD_PKCS5)
	l = k.decrypt(miw)
	#n=str(l,str)
	f = open('DES_decryptmw.txt', 'wb')
	f.write(l)
	f.close()

if __name__ == '__main__':
	DES_encrypt()
	DES_decrypt()
