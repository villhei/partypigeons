import { Vec2D, Vector2D, Vector3D } from '~/util/vector'

export function projectPosition(
  position: Vector3D,
  origin3D: Vector3D,
  eye: Vector3D
): Vector2D {
  const x = origin3D.x + (position.x - eye.x) * (eye.z / (position.z + eye.z))
  const y = origin3D.y + (position.y - eye.y) * (eye.z / (position.z + eye.z))
  return Vec2D(x, y)
}
