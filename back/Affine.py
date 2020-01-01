from xml.dom import minidom #导入模块
dom=minidom.parse(r"static/scratch.xml") #打开xml

def Affine_get_message():
    ming = dom.getElementsByTagName("mingwen")  # 获取节点列表
    for i in range(len(ming)):
        s = ming[i].firstChild.data  # 打印节点数据
    #f = open('Affine_mingwen.txt', 'r')
    #s = f.read()
    #f.close()
    return s

def Affine_get_miwen():
    f = open('Affine_encryptmiwen.txt', 'r')
    m = f.read()
    f.close()
    return m

def Affine_get_decryptmw():
    f = open('Affine_decryptmiwen.txt', 'r')
    m = f.read()
    f.close()
    return m

def Affine_get_key1():
    k1 = dom.getElementsByTagName("A-key1")  # 获取节点列表
    s = k1[0].firstChild.data  # 打印节点数据
    #f = open('Affine_key1.txt', 'r')
    #s = f.read()
    #f.close()
    return s

def Affine_get_key2():
    #f = open('Affine_key2.txt', 'r')
    #s = f.read()
    #f.close()
    k2 = dom.getElementsByTagName("A-key2")  # 获取节点列表
    s = k2[0].firstChild.data  # 打印节点数据
    return s

# 最大公约数
def gcd(a, b):
    while b != 0:
        tem = a % b
        a = b
        b = tem
    return a

# 加密
def Affine_encrypt():
    m=Affine_get_message()
    a=Affine_get_key1()
    b=Affine_get_key2()
    a=int(a)
    b=int(b)
    c = []
    for i in range(len(m)):
        # 加密成相应的大写字母
        if m[i] == ' ':
            c.append(' ')
        else:
            c.append(chr(((ord(m[i]) - 97) * a + b) % 26+65))
    d = ''.join(c)
    f = open('Affine_encryptmiwen.txt', 'w')
    f.write(d)
    f.close()

# 求逆元
def niyuan(a, b):
    ny = 1
    while (a * ny) % b != 1:
        ny += 1
    return ny

# 解密
def Affine_decrypt():
    f = open('Affine_encryptmiwen.txt', 'r')
    c = f.read()
    c = str(c)
    f.close()
    a = Affine_get_key1()
    b = Affine_get_key2()
    a=int(a)
    b=int(b)
    k = niyuan(a,26)
    mw = []
    for i in range(len(c)):
        if c[i] == ' ':
            mw.append(' ')
        else:
            tem = ord(c[i]) - 65 - b
            mw.append(chr((k*((tem+26)%26))%26+97))
    res = ''.join(mw)
    f = open('Affine_decryptmiwen.txt', 'w')
    f.write(res)
    f.close()

#def get_mode():
    #print("请选择加密或者解密")
    #print("1. Encrypt")
    #print("2. Decode")
    #mode = input()
    #if mode == '1':
     #   Affine_encrypt()
      #  print("加密成功")
    #elif mode == '2':
        #Affine_decrypt()
        #print("解密成功")
    #else:
     #   print("输入有误！")


if __name__ == '__main__':
    Affine_encrypt()
    Affine_decrypt()