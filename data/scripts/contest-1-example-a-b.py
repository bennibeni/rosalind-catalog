def	lettura(filename):
				with open(filename) as f:
					header	=	None
					body	=	[]			
					for	riga	in	f:
												riga	=	riga.rstrip("\n")
												if	header	is	None:			
															header	=	riga
												else:
															body.append(riga)
				assert header is not None
				data = (header,	body)
				return	data

def	main():
				data	=	lettura("input.txt")
				n = int(data[0])
				for	i	in	range(n):
					a, b = data[1][i].split(" ")
					print(int(a)+int(b))

if	__name__	==	"__main__":
				#	execute	only	if	run	as	a	script
				main()
