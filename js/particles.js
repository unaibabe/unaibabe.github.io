/* ==========================================================================
   UNAI IBABE - CROWD PIPELINE SIMULATOR (particles.js)
   Custom 60fps Boids Flocking Simulation with Interactive Repulsion
   ========================================================================== */

class Boid {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    
    // Random velocity
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 1.5 + 0.5;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    
    // Core parameters (Boids physics)
    this.radius = 2.5;
    this.maxSpeed = 2.2;
    this.maxForce = 0.03;
    
    // Visual settings
    this.hue = Math.random() < 0.6 ? 185 : 270; // Cyan (185) or Purple (270)
  }

  update() {
    // Add velocity to position
    this.x += this.vx;
    this.y += this.vy;

    // Wrap around screen edges seamlessly
    if (this.x < 0) this.x = this.canvas.width;
    if (this.x > this.canvas.width) this.x = 0;
    if (this.y < 0) this.y = this.canvas.height;
    if (this.y > this.canvas.height) this.y = 0;
  }

  applyForce(forceX, forceY) {
    // Limit speed increments
    this.vx += forceX;
    this.vy += forceY;
    
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > this.maxSpeed) {
      this.vx = (this.vx / speed) * this.maxSpeed;
      this.vy = (this.vy / speed) * this.maxSpeed;
    }
  }

  // Boid Rule 1: Separation (Avoid crowding local flockmates)
  separate(boids) {
    const desiredSeparation = 25;
    let steerX = 0;
    let steerY = 0;
    let count = 0;

    for (let i = 0; i < boids.length; i++) {
      const other = boids[i];
      if (other === this) continue;

      const dx = this.x - other.x;
      const dy = this.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 0 && distance < desiredSeparation) {
        // Calculate vector pointing away from neighbor
        let forceX = dx / distance;
        let forceY = dy / distance;
        
        // Closer = stronger push
        forceX /= distance;
        forceY /= distance;
        
        steerX += forceX;
        steerY += forceY;
        count++;
      }
    }

    if (count > 0) {
      steerX /= count;
      steerY /= count;
    }

    const steerMag = Math.sqrt(steerX * steerX + steerY * steerY);
    if (steerMag > 0) {
      // Steering = Desired - Velocity
      steerX = (steerX / steerMag) * this.maxSpeed - this.vx;
      steerY = (steerY / steerMag) * this.maxSpeed - this.vy;
      
      // Limit force
      const forceMag = Math.sqrt(steerX * steerX + steerY * steerY);
      if (forceMag > this.maxForce) {
        steerX = (steerX / forceMag) * this.maxForce;
        steerY = (steerY / forceMag) * this.maxForce;
      }
    }
    return { x: steerX, y: steerY };
  }

  // Boid Rule 2: Alignment (Steer towards the average heading of neighbors)
  align(boids) {
    const neighborDist = 60;
    let sumX = 0;
    let sumY = 0;
    let count = 0;

    for (let i = 0; i < boids.length; i++) {
      const other = boids[i];
      if (other === this) continue;

      const dx = this.x - other.x;
      const dy = this.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 0 && distance < neighborDist) {
        sumX += other.vx;
        sumY += other.vy;
        count++;
      }
    }

    if (count > 0) {
      sumX /= count;
      sumY /= count;
      
      const sumMag = Math.sqrt(sumX * sumX + sumY * sumY);
      if (sumMag > 0) {
        let steerX = (sumX / sumMag) * this.maxSpeed - this.vx;
        let steerY = (sumY / sumMag) * this.maxSpeed - this.vy;
        
        const steerMag = Math.sqrt(steerX * steerX + steerY * steerY);
        if (steerMag > this.maxForce) {
          steerX = (steerX / steerMag) * this.maxForce;
          steerY = (steerY / steerMag) * this.maxForce;
        }
        return { x: steerX, y: steerY };
      }
    }
    return { x: 0, y: 0 };
  }

  // Boid Rule 3: Cohesion (Steer to move toward the center of mass of neighbors)
  cohere(boids) {
    const neighborDist = 60;
    let sumX = 0;
    let sumY = 0;
    let count = 0;

    for (let i = 0; i < boids.length; i++) {
      const other = boids[i];
      if (other === this) continue;

      const dx = this.x - other.x;
      const dy = this.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 0 && distance < neighborDist) {
        sumX += other.x;
        sumY += other.y;
        count++;
      }
    }

    if (count > 0) {
      sumX /= count;
      sumY /= count;
      
      // Calculate steering to that position
      let steerX = sumX - this.x;
      let steerY = sumY - this.y;
      const steerMag = Math.sqrt(steerX * steerX + steerY * steerY);
      if (steerMag > 0) {
        steerX = (steerX / steerMag) * this.maxSpeed - this.vx;
        steerY = (steerY / steerMag) * this.maxSpeed - this.vy;
        
        const forceMag = Math.sqrt(steerX * steerX + steerY * steerY);
        if (forceMag > this.maxForce) {
          steerX = (steerX / forceMag) * this.maxForce;
          steerY = (steerY / forceMag) * this.maxForce;
        }
        return { x: steerX, y: steerY };
      }
    }
    return { x: 0, y: 0 };
  }

  // Obstacle/Mouse Repulsion (Force boids away from user interaction)
  flee(mouseX, mouseY) {
    const desiredDist = 120;
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < desiredDist && distance > 0) {
      let steerX = dx / distance;
      let steerY = dy / distance;
      
      // Repulsion force scales exponentially based on closeness
      const intensity = (desiredDist - distance) / desiredDist;
      steerX = steerX * this.maxSpeed * intensity * 2 - this.vx;
      steerY = steerY * this.maxSpeed * intensity * 2 - this.vy;

      const steerMag = Math.sqrt(steerX * steerX + steerY * steerY);
      if (steerMag > this.maxForce * 4) {
        steerX = (steerX / steerMag) * this.maxForce * 4;
        steerY = (steerY / steerMag) * this.maxForce * 4;
      }
      return { x: steerX, y: steerY };
    }
    return { x: 0, y: 0 };
  }

  draw(ctx) {
    // Draw the boid as a modern glowing circle
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 90%, 65%, 0.65)`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = `hsl(${this.hue}, 100%, 60%)`;
    ctx.fill();
    ctx.shadowBlur = 0; // Reset shadow for canvas rendering speed
  }
}

// Particle Pipeline Manager
class SimulationManager {
  constructor() {
    this.canvas = document.getElementById('particles-canvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.boids = [];
    this.mouseX = -1000;
    this.mouseY = -1000;

    this.init();
    this.setupEventListeners();
    this.animate();
  }

  init() {
    this.resizeCanvas();
    
    // Scale density based on width (e.g. mobile gets fewer boids)
    const density = Math.floor((this.canvas.width * this.canvas.height) / 22000);
    const maxBoids = Math.min(density, 65); // Cap at 65 boids for elite performance
    
    this.boids = [];
    for (let i = 0; i < maxBoids; i++) {
      this.boids.push(new Boid(this.canvas));
    }
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      // Re-init boids count based on screen size safely
      const density = Math.floor((this.canvas.width * this.canvas.height) / 22000);
      const maxBoids = Math.min(density, 65);
      while (this.boids.length < maxBoids) {
        this.boids.push(new Boid(this.canvas));
      }
      if (this.boids.length > maxBoids) {
        this.boids.splice(maxBoids);
      }
    });

    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      this.mouseX = -1000;
      this.mouseY = -1000;
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    
    // Super faint trail to simulate motion speed and cinematic frames
    this.ctx.fillStyle = 'rgba(3, 7, 18, 0.25)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Apply boids logical operations
    this.boids.forEach(boid => {
      const sep = boid.separate(this.boids);
      const ali = boid.align(this.boids);
      const coh = boid.cohere(this.boids);
      const flee = boid.flee(this.mouseX, this.mouseY);

      // Tune weights of each flocking force (VFX crowd parameters)
      boid.applyForce(sep.x * 1.5, sep.y * 1.5);
      boid.applyForce(ali.x * 1.0, ali.y * 1.0);
      boid.applyForce(coh.x * 1.0, coh.y * 1.0);
      boid.applyForce(flee.x * 2.5, flee.y * 2.5); // Strong mouse push

      boid.update();
    });

    // Draw connecting vectors (neural network mesh design)
    this.drawMeshConnections();

    // Render nodes
    this.boids.forEach(boid => boid.draw(this.ctx));
  }

  drawMeshConnections() {
    const maxDist = 95;
    this.ctx.lineWidth = 0.55;

    for (let i = 0; i < this.boids.length; i++) {
      const b1 = this.boids[i];
      for (let j = i + 1; j < this.boids.length; j++) {
        const b2 = this.boids[j];
        
        const dx = b1.x - b2.x;
        const dy = b1.y - b2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          // Opacity decreases linearly with distance
          const alpha = (maxDist - dist) / maxDist * 0.16;
          
          // Blend gradient hues of the boids
          this.ctx.beginPath();
          this.ctx.moveTo(b1.x, b1.y);
          this.ctx.lineTo(b2.x, b2.y);
          
          // Style lines as glowing tech blueprints
          const grad = this.ctx.createLinearGradient(b1.x, b1.y, b2.x, b2.y);
          grad.addColorStop(0, `hsla(${b1.hue}, 90%, 65%, ${alpha})`);
          grad.addColorStop(1, `hsla(${b2.hue}, 90%, 65%, ${alpha})`);
          
          this.ctx.strokeStyle = grad;
          this.ctx.stroke();
        }
      }
    }
  }
}

// Instantiate crowd simulation
new SimulationManager();
