---

### **1️⃣ Build the Docker Image**
Run this command in the same directory where your `Dockerfile` is located:

```sh
docker build -t zeroday-backend .
```

**Explanation**:
- `docker build` → Builds a Docker image.
- `-t zeroday-backend` → Assigns the name `zeroday-backend` to the image.
- `.` → Uses the current directory as the build context (where `Dockerfile` is located).

---

### **2️⃣ Run the Container**
Once the image is built, you can run it:

```sh
docker run -d -p 3000:3000 --name zeroday-backend-container zeroday-backend
```

**Explanation**:
- `docker run` → Runs a container from the image.
- `-d` → Runs the container in detached mode (background).
- `-p 3000:3000` → Maps port **3000 of the container** to **3000 on your host**.
- `--name zeroday-backend-container` → Names the running container.
- `zeroday-backend` → The image name.

---

### **3️⃣ Verify that the Container is Running**
Run:

```sh
docker ps
```

You should see your `zeroday-backend-container` running.

---

### **4️⃣ Stop and Remove the Container (If Needed)**
If you want to stop and remove the container:

```sh
docker stop zeroday-backend-container
docker rm zeroday-backend-container
```

---

### **5️⃣ Run the Container with Auto-Restart (Optional)**
If you want the backend to restart automatically on crashes or reboots:

```sh
docker run -d --restart unless-stopped -p 3000:3000 --name zeroday-backend-container zeroday-backend
```

---