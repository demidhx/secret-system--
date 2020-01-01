import io
cipher1=""
def get_message():
    fo = open("split.txt","r",encoding='utf-8')
    s = fo.read()
    s=str(s)
    fo.close()
    return s
def get_key():
    fo = open("RC4_key.txt", "r")
    s = fo.read()
    s = str(s)
    fo.close()
    return s
def get_message1():
    return cipher1
'''
def get_key():
    print("输入你的秘钥：")
    key = get_key()
    if key == '':
        key = 'none_public_key'
    return key
'''
def init_box(key):
    """
    S盒
    """
    s_box = list(range(256)) #这里没管秘钥小于256的情况，小于256应该不断重复填充即可
    j = 0
    for i in range(256):
        j = (j + s_box[i] + ord(key[i % len(key)])) % 256
        s_box[i], s_box[j] = s_box[j], s_box[i]
    return s_box
def ex_encrypt(plain,box,mode):
    """
    利用PRGA生成秘钥流并与密文字节异或，加解密同一个算法
    """
    if mode == '2':
        plain = plain
    res = []
    i = j =0
    for s in plain:
        i = (i + 1) %256
        j = (j + box[i]) %256
        box[i], box[j] = box[j], box[i]
        t = (box[i] + box[j])% 256
        k = box[t]
        res.append(chr(ord(s)^k))
    cipher = "".join(res)
    if  mode == '1':
        fo=open("RC4_encryption.txt","wb+")
        # 化成可视字符需要编码
        #print("加密后的输出:")
        #print(cipher)
        #print(type(cipher))
        global cipher1
        cipher1 = cipher
        cipher = cipher.encode()
        fo.seek(0)
        fo.write(cipher)
        fo.seek(0)
        listsss=[fo.read(1) for i in range(100)]
        fo.close()
    if mode == '2':
        with open("RC4_decryption.txt",'w')as f:
            f.write(cipher)
        # 化成可视字符需要编码
        #print("解密后的输出:")
        #print(cipher)
def f_write(filename,message):
        f = open(filename,'w')
        f.write(message)
        f.close()
        return 0

def get_mode():
    print("请选择加密或者解密")
    print("1. Encrypt")
    print("2. Decode")
    mode = input()
    if mode == '1':
        message = get_message()
        key = get_key()
        box = init_box(key)
        ex_encrypt(message,box,mode)
    elif mode == '2':
        message = get_message1()
        key = get_key()
        box = init_box(key)
        ex_encrypt(message, box, mode)
    else:
        print("输入有误！")

def RC4_encryption():
    message = get_message()
    key = get_key()
    box = init_box(key)
    mode='1'
    ex_encrypt(message,box,mode)

def RC4_decryption():
    message = get_message1()
    key = get_key()
    box = init_box(key)
    mode='2'
    ex_encrypt(message, box, mode)

if __name__ == '__main__':
    #get_mode()
    RC4_encryption()
    RC4_decryption()