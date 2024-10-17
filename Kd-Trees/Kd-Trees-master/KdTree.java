import edu.princeton.cs.algs4.Point2D;
import edu.princeton.cs.algs4.RectHV;
import edu.princeton.cs.algs4.StdDraw;
import java.util.LinkedList;
import java.util.List;

public class KdTree {
    private Node root = null;
    private int size = 0;
    private Point2D nearestPoint = null;

    private class Node {
        private final Point2D point;
        private Node left;
        private Node right;
        private final boolean isVertical;
        private final RectHV rect;

        public Node(Point2D point, boolean isVertical, Node parent) {
            this.point = point;
            this.isVertical = isVertical;

            if (parent == null) {
                this.rect = new RectHV(0, 0, 1, 1);
            } else {
                double minX = parent.rect.xmin();
                double minY = parent.rect.ymin();
                double maxX = parent.rect.xmax();
                double maxY = parent.rect.ymax();

                int result = parent.compareTo(point);

                if (isVertical) {
                    if (result > 0) {
                        maxY = parent.point.y();
                    } else {
                        minY = parent.point.y();
                    }
                } else {
                    if (result > 0) {
                        maxX = parent.point.x();
                    } else {
                        minX = parent.point.x();
                    }
                }

                this.rect = new RectHV(minX, minY, maxX, maxY);
            }
        }

        public int compareTo(Point2D that) {
            if (isVertical) {
                return Double.compare(this.point.x(), that.x());
            } else {
                return Double.compare(this.point.y(), that.y());
            }
        }

        public void draw() {
            StdDraw.setPenRadius(0.005);

            if (isVertical) {
                StdDraw.setPenColor(StdDraw.RED);
                StdDraw.line(point.x(), rect.ymin(), point.x(), rect.ymax());
            } else {
                StdDraw.setPenColor(StdDraw.BLUE);
                StdDraw.line(rect.xmin(), point.y(), rect.xmax(), point.y());
            }

            StdDraw.setPenRadius(0.03);
            StdDraw.setPenColor(StdDraw.BLACK);
            point.draw();

            if (left != null) {
                left.draw();
            }

            if (right != null) {
                right.draw();
            }
        }
    }

    public KdTree() {
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public int size() {
        return size;
    }

    public void insert(Point2D p) {
        if (p == null) throw new IllegalArgumentException();

        root = put(root, p, true, null);
    }

    private Node put(Node node, Point2D point, boolean isVertical, Node previous) {
        if (node == null) {
            size++;
            return new Node(point, isVertical, previous);
        }
        
        if (node.point.compareTo(point) == 0) return node;

        if (node.compareTo(point) > 0) {
            node.left = put(node.left, point, !isVertical, node);
        } else {
            node.right = put(node.right, point, !isVertical, node);
        }

        return node;
    }

    public boolean contains(Point2D p) {
        if (p == null) throw new IllegalArgumentException();

        return get(root, p) != null;
    }

    private Node get(Node node, Point2D point) {
        if (node == null) return null;

        if (node.point.equals(point)) return node;
        
        if (node.compareTo(point) > 0) {
            return get(node.left, point);
        } else {
            return get(node.right, point);
        }
    }

    public void draw() {
        if (root != null) {
            root.draw();
        }
    }

    public Iterable<Point2D> range(RectHV rect) {
        if (rect == null) throw new IllegalArgumentException();

        return range(root, rect, new LinkedList<Point2D>());
    }

    private List<Point2D> range(Node node, RectHV rect, List<Point2D> points) {
        if (node == null) return points;

        if (node.rect.intersects(rect)) {
            if (rect.contains(node.point)) {
                points.add(node.point);
            }

            range(node.left, rect, points);
            range(node.right, rect, points);
        }

        return points;
    }

    public Point2D nearest(Point2D p) {
        if (p == null) throw new IllegalArgumentException();

        if (isEmpty()) return null;

        nearestPoint = root.point;
        nearestPoint(root, p);

        return nearestPoint;
    }

    private void nearestPoint(Node node, Point2D point) {
        if (node == null) return;

        if (node.rect.distanceSquaredTo(point) < nearestPoint.distanceSquaredTo(point)) {
            updateNearestPointIfNeeded(point, node.point);

            if (node.compareTo(point) > 0) {
                nearestPoint(node.left, point);
                nearestPoint(node.right, point);
            } else {
                nearestPoint(node.right, point);
                nearestPoint(node.left, point);
            }
        }
    }

    private boolean updateNearestPointIfNeeded(Point2D targetPoint, Point2D newPoint) {
        if (nearestPoint == null) {
            nearestPoint = newPoint;
            return true;
        }

        double distanceToNearest = targetPoint.distanceSquaredTo(nearestPoint);
        double distanceToNew = targetPoint.distanceSquaredTo(newPoint);

        if (distanceToNew < distanceToNearest) {
            nearestPoint = newPoint;
            return true;
        }

        return false;
    }
 }