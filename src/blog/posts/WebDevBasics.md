---
layout: layouts/post.html
title: Web Dev Basics
description: Reviewing JS basic
date: 2026-08-18
type: default
tags:
  - JavaScript
  - Cybersecurity
  - WebDevelopment
---
JS Libraries
- Picomatch 
	- for matching glob patterns

**Web server**
- stores and delivers website files to a user's browser
- examples: Apache, NGINX, Microsoft IIS

**Reverse Proxy** 反向代理服务器
- is a helper server that sits in front of web servers
- 类似一个保安，过滤器，分流器(load balancing)
- A reverser proxy is called 'reverse' because it flips who is being protected and served.
	- while a standard (forward) proxy sits in front of a client to hide and protect the user
	- a reverse proxy sits in front of a web server to hide and protect the backend server  
> When you run Strapi, you are executing a JavaScript program inside Node.js.
That program (e.g. when you `npm run dev`) uses Node's built-in `http` module to create a server. 

>Starting with **Strapi 5**, the core development team replaced Webpack with [Vite](https://vite.dev/) to significantly speed up local building, compilation, and Hot Module Replacement (HMR) for the content management interface. 

**Node.JS**
- includes built-in tools that allows you to build a web server using just a few lines of code
	- Why would a runtime environment has built-in tools?
		- To give JS abilities that it does not have 
			- example core modules 
				- `fs` (file system)
					- to create, read, update and delete file on your hard drive
				- `http`
					- allows your computer to act as a web server and listen for network traffic
				- `path`
					- to handle and fix file paths across different operating sustems
		- To manage external pack
	- Are `built-in tools` referring to modules? or libraries? Could you use the correct term?
		- `built-in tools` are referring to the `core modules` (`built-in libraries`) bundled together with Node.JS when you installed it.

	- What is the difference between a module and a package?
		- Modules are individual files of code
			- a single JS file
				- ???? then is ES modules a module?
				- ES Modules (ECMAScript Modules) are the official, standard file format for sharing code between JavaScript files 
					- WHY?
						- ES Modules (ESM) were created because **(`require`) is not an official JavaScript standard** and cannot run natively in web browsers without complex bundling tools.
						- While CommonJS worked perfectly for server-side environments like Node.js, 
						- JavaScript lacked a universal, standardized module system capable of running efficiently across both the server and the client side. 
				- Yes, they are real modules. 
				- No, a module is not always just a single file; while a basic module lives in one file, a module can also combine and export code from many other files.
			- you use `import` or `require()` to bring a module into your current file
				- `require()`
					- old
					- CommonJS syntax
				- `import`
					- new
					- ES Modules syntax 
					- TypeScript
						- TypeScript is NOT ESM 
						- it mimics the modern JS standards
						- `tsc` (TypeScript Compiler) teaks your `.ts` files and translates them down into whatever format your environment needs
							- This means that ==TypeScript can be translated to either ESM or CommonJS==
								- `tsconfig.json`
									- 有可能是`"module": "CommonJS"`
									- 也可以是`"module": "ESNext"`
		- Packages are collection of modules bundled together that you can install
			- Library vs. Packages???
				- A **library is the actual code** you write to solve a problem, while a **package is the shipping container** used to distribute and install that library. 

**NGINX**
Why would we need ==NGINX== ?
- Nginx is a specialized tool optimized for high-performance traffic handling
	- it manages your HTTPS certificates
		- an HTTPS certificate and a TLS certificate are the same thing (often still called an [SSL certificate](https://www.cloudflare.com/learning/ssl/what-is-an-ssl-certificate/)).
		- **Certificates** are digital files *installed* on a **web server** that allow a website to use the secure HTTPS web protocol via the TLS (Transport Layer Security encryption system) 

	- Is certificated tied with domain or webserver or URL?
		- An SSL/TLS certificate is primarily tied to the **domain name** (e.g., `yourdomain.com`).
			- A ==Wildcard SSL certificate== is a special type of SSL certificate. 
			- It secures a main domain and all its associated subdomains.

	- How does have a certificate encrypts your data (==locks data==)
		- A certificate uses a system called **Asymmetric Encryption**, which relies on a pair of mathematical keys: a **Public Key** and a **Private Key**.

		1. **The Lock (Public Key):** The certificate contains a Public Key that is visible to the entire world. When a user visits your site, their browser uses this public key to "lock" (encrypt) their data (like passwords or credit cards). Once locked, _only_ your specific private key can open it. 
		2. **The Key (Private Key):** This key stays hidden safely inside your Nginx webserver. When the encrypted data arrives at your server, Nginx uses the private key to unlock it. 
			
		- Anyone snooping on the internet traffic in between just sees scrambled, unreadable nonsense. 
			
	- Can certificate be stolen?
		- The public certificate is meant to be shared. 
		- However, if a hacker breaks into your server and steals your **Private Key**, they can set up a fake website impersonating you, or decrypt the traffic sent by your users. This is why keeping your server software updated and securing your SSH access is critical. 
	
	- Does having a certificate makes your web server safe and secure?
		- No. 
		- ==A certificate only secures the connection _in transit==

	- What other protections are important for our backend? 
		- Firewall
			- close all server ports except the ones absolutely needed 
		- Environment Variables (we have this)
		- Rate Limiting
			- use Nginx or a Strapi plugin to limit how many request an IP address can make per minute
			- stops both from crashing the server or guessing passwords rapidly

	- Is one certificate enough?
		- A single certificate can protect your main website, your Strapi admin panel, and your API routes if they all share the same domain name
		- You only need more than one certificate if you run completely different domains
		- So this one certificate has to be wildcard?

- Node.JS is single-threaded 
	- not quite
		- Node uses **libuv** and operating-system facilities to handle asynchronous I/O.
		- Some operations can also use a **thread pool** underneath.
	- So it can one do one thing at a time? 
		- No
	- What does it mean that it uses an "event loop"? 
		- The event loop is essentially a mechanism that lets Node.js say:
			- “I'm waiting for something. I don't need to sit here doing nothing. I'll handle something else and come back when the result is ready.”
	- Why Node.JS choose this design? 
		- Because servers spend **a lot of time waiting**.
	- Did the browsers do this for JS code too?
		- yes
		- this is called event-driven programming model 

	- How does Nginx help to balance for traffic then?
		- can distribute traffic across **multiple Node processes/servers**

- Crash Protection
	- If Node.js crashes due to a code error, Nginx stays online and can display a friendly "Maintenance" page instead of a broken connection error.

p.s. 这个才叫**subdomains**

```
https://haven.example.com       -> frontend
https://api.haven.example.com   -> Strapi API
https://admin.haven.example.com -> Strapi Admin
```

p.s. 这个叫**subfolders**，不需要 *wildcard* SSL certificate

```
https://example.com/
https://example.com/admin
https://example.com/api/members
```


**Authentication**: 
- Who you are
- checks user credentials like password, pins or finger prints 
**Authorization**:
- What you can do or access
- check user roles, rules and permissions set by admin

JWT secret
- Secret is used for creating the signature
- JWT makes the authentication stateless
	- no server side session storage 
- Server verifies token signature

**JWT**
- Structure
	- Header
	- Payload
		- is encoded (Base64URL encoded), not encrypted
			- meaning everyone who has the payload can see what is inside
			- do not put sensitive information inside the payload
	- Signature
		- SIGNATURE = sign(HEADER + "." + PAYLOAD, SECRET)
		- preserves integrity
		- is tied to the header AND payload

HTTP request Authorization Header
- `Authorization: Bearer <JWT>`

How is login secure then? (before receiving the JWT)
In properly configured application
- the login request uses HTTPS/TLS (Transport Layer Security)

The JWT payload is primarily about **who/what the request is authenticated as**.
The HTTP body is about **what the client is asking the server to do**.

JWT alone does not make the connection secure.
==It provides a way for the server to authenticate requests and detect tampering(篡改) with the token, but it does not encrypt the communication or protect the token while it is being transmitted.==

HTTPS/TLS provides that transport security.

JWT helps with impersonation, but it doesn't completely solve impersonation. A stolen valid JWT is effectively a stolen credential. 
- (If an attacker **steals a valid JWT**, they don't need to tamper it at all)