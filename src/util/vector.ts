export class Vector2D {
  readonly x: number
  readonly y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  dot(other: Vector2D) {
    return this.x * other.x + this.y * other.y
  }

  multiply(value: number) {
    return new Vector2D(this.x * value, this.y * value)
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  squaredLength() {
    return this.x * this.x + this.y * this.y
  }

  normalize() {
    return new Vector2D(this.x / this.length(), this.y / this.length())
  }

  subtract(vector: Vector2D) {
    return new Vector2D(this.x - vector.x, this.y - vector.y)
  }

  add(vector: Vector2D) {
    return new Vector2D(this.x + vector.x, this.y + vector.y)
  }

  divide(value: number) {
    return new Vector2D(this.x / value, this.y / value)
  }

  deltax(vector: Vector2D) {
    return this.x - vector.x
  }

  deltay(vector: Vector2D) {
    return this.y - vector.y
  }

  components(): [number, number] {
    return [this.x, this.y]
  }
}

export class Vector3D {
  readonly x: number
  readonly y: number
  readonly z: number

  constructor(x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
  }

  dot(other: Vector3D) {
    return this.x * other.x + this.y * other.y + this.z * other.z
  }

  multiply(value: number) {
    return new Vector3D(this.x * value, this.y * value, this.z * value)
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  }

  squaredLength() {
    return this.x * this.x + this.y * this.y
  }

  normalize() {
    return new Vector3D(
      this.x / this.length(),
      this.y / this.length(),
      this.z / this.length()
    )
  }

  subtract(other: Vector3D) {
    return new Vector3D(this.x - other.x, this.y - other.y, this.z - other.z)
  }

  add(other: Vector3D) {
    return new Vector3D(this.x + other.x, this.y + other.y, this.z + other.z)
  }

  divide(value: number) {
    return new Vector3D(this.x / value, this.y / value, this.z / value)
  }

  deltax(vector: Vector3D) {
    return this.x - vector.x
  }

  deltay(vector: Vector3D) {
    return this.y - vector.y
  }

  deltaz(vector: Vector3D) {
    return this.z - vector.z
  }

  components(): [number, number, number] {
    return [this.x, this.y, this.z]
  }
}

export const Vec2D = (x: number, y: number) => new Vector2D(x, y)
export const Vec3D = (x: number, y: number, z: number) => new Vector3D(x, y, z)
