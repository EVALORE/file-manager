import gzip

def compressFile(name):
  with open(name, 'rb') as f_in:
    with gzip.open(name + '.gz', 'wb') as f_out:
      f_out.writelines(f_in)

def decompressFile(name):
  with gzip.open(name, 'rb') as f_in:
    with open(name[:-3], 'wb') as f_out:
      f_out.writelines(f_in)
