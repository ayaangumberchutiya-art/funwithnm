const CODES = {

"scarborough": `#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;
int main() {
    int significant_figures = 8;
    double x = 0.5;

    double es = 0.5 * pow(10.0, 2 - significant_figures);
    double true_val = exp(x);
    double term = 1.0;
    double approx = term;
    int step = 1;
    cout << fixed << setprecision(8);
    while (true) {
        term *= (x / step);
        double prev = approx;
        approx += term;
        double ea = fabs((approx - prev) / approx) * 100.0;
        double et = fabs((true_val - approx) / true_val) * 100.0;
        cout << step << "\\t" << approx << "\\t" << et << "%\\t" << ea << "%\\n";
        if (ea < es) break;
        step++;
    }
    cout << "\\nStopping at step: " << step << endl;
    return 0;
}`,

"maclaurin-cos": `#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;
int main() {
    int significant_figures = 8;
    double x = 0.3 * M_PI;

    double es = 0.5 * pow(10.0, 2 - significant_figures);
    double true_val = cos(x);
    double term = 1.0;
    double approx = term;
    int k = 1;
    cout << fixed << setprecision(8);
    while (true) {
        term *= -(x * x) / ((2 * k - 1) * (2 * k));
        double prev = approx;
        approx += term;
        double ea = fabs((approx - prev) / approx) * 100.0;
        cout << "Term " << (k + 1) << ": " << approx << "  ea=" << ea << "%\\n";
        if (ea < es) {
            cout << "\\nTerms needed: " << (k + 1) << endl;
            break;
        }
        k++;
    }
    return 0;
}`,

"bisection": `#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;
double f(double x) {
    return x*x*x - x - 1;
}
int main() {
    double a = 1.0;
    double b = 2.0;
    double tol = 1e-5;

    double c;
    int iter = 0;
    cout << fixed << setprecision(6);
    cout << "Iter\\ta\\t\\tb\\t\\tc\\t\\tf(c)\\n";
    while ((b - a) / 2.0 > tol) {
        c = (a + b) / 2.0;
        iter++;
        cout << iter << "\\t" << a << "\\t" << b << "\\t" << c << "\\t" << f(c) << "\\n";
        if (fabs(f(c)) < tol) break;
        if (f(a) * f(c) < 0) b = c;
        else a = c;
    }
    cout << "\\nRoot: " << c << "  Iterations: " << iter << endl;
    return 0;
}`,

"regula-falsi": `#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;
double f(double x) {
    return x*x*x - x - 1;
}
int main() {
    double a = 1.0;
    double b = 2.0;
    double tol = 1e-5;

    double c = a;
    int iter = 0;
    cout << fixed << setprecision(6);
    cout << "Iter\\ta\\t\\tb\\t\\tc\\t\\tf(c)\\n";
    while (true) {
        double fa = f(a), fb = f(b);
        double c_prev = c;
        c = (a * fb - b * fa) / (fb - fa);
        iter++;
        cout << iter << "\\t" << a << "\\t" << b << "\\t" << c << "\\t" << f(c) << "\\n";
        if (fabs(c - c_prev) < tol || fabs(f(c)) < tol) break;
        if (f(a) * f(c) < 0) b = c;
        else a = c;
    }
    cout << "\\nRoot: " << c << "  Iterations: " << iter << endl;
    return 0;
}`,

"newton-raphson": `#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;
double f(double x) {
    return x*x*x - 2*x*x - x + 2;
}
double df(double x) {
    return 3*x*x - 4*x - 1;
}
int main() {
    double x0 = 3.0;
    double tol = 1e-6;
    int max_iter = 100;

    cout << fixed << setprecision(6);
    cout << "Iter\\tx_n\\t\\tf(x_n)\\t\\tf'(x_n)\\n";
    for (int i = 1; i <= max_iter; i++) {
        double y = f(x0), dy = df(x0);
        cout << i << "\\t" << x0 << "\\t" << y << "\\t" << dy << "\\n";
        if (fabs(dy) < 1e-12) { cout << "Derivative zero.\\n"; return 1; }
        double x1 = x0 - y / dy;
        if (fabs(x1 - x0) < tol) {
            cout << "\\nRoot: " << x1 << "  Iterations: " << i << endl;
            return 0;
        }
        x0 = x1;
    }
    return 0;
}`,

"secant": `#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;
double f(double x) {
    return x*x - 2;
}
int main() {
    double x0 = 0.0;
    double x1 = 2.0;
    double tol = 1e-6;
    int max_iter = 50;

    cout << fixed << setprecision(6);
    cout << "Iter\\tx_n\\t\\tf(x_n)\\n";
    for (int i = 1; i <= max_iter; i++) {
        double f0 = f(x0), f1 = f(x1);
        if (fabs(f1 - f0) < 1e-12) { cout << "Division by zero.\\n"; return 1; }
        double x2 = x1 - f1 * (x1 - x0) / (f1 - f0);
        cout << i << "\\t" << x2 << "\\t" << f(x2) << "\\n";
        if (fabs(x2 - x1) < tol) {
            cout << "\\nRoot: " << x2 << "  Iterations: " << i << endl;
            return 0;
        }
        x0 = x1;
        x1 = x2;
    }
    return 0;
}`,

"root-compare": `#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;
double f(double x) { return exp(-x) - x; }
double df(double x) { return -exp(-x) - 1; }
int main() {
    double true_root = 0.56714329;
    int iterations = 6;

    cout << fixed << setprecision(6);
    double a = 0, b = 1, c;
    cout << "--- Bisection ---\\n";
    for (int i = 1; i <= iterations; i++) {
        c = (a + b) / 2.0;
        double err = fabs((true_root - c) / true_root) * 100.0;
        cout << "Iter " << i << ": c=" << c << "  err=" << err << "%\\n";
        if (f(a)*f(c) < 0) b = c; else a = c;
    }
    a = 0; b = 1;
    cout << "\\n--- Regula Falsi ---\\n";
    for (int i = 1; i <= iterations; i++) {
        c = (a*f(b) - b*f(a)) / (f(b) - f(a));
        double err = fabs((true_root - c) / true_root) * 100.0;
        cout << "Iter " << i << ": c=" << c << "  err=" << err << "%\\n";
        if (f(a)*f(c) < 0) b = c; else a = c;
    }
    double x0 = 0, x1 = 1;
    cout << "\\n--- Secant ---\\n";
    for (int i = 1; i <= iterations; i++) {
        double x2 = x1 - f(x1)*(x1 - x0)/(f(x1) - f(x0));
        double err = fabs((true_root - x2) / true_root) * 100.0;
        cout << "Iter " << i << ": x=" << x2 << "  err=" << err << "%\\n";
        x0 = x1; x1 = x2;
    }
    return 0;
}`,

"gaussian-elimination": `#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;
int main() {
    int n = 3;
    vector<vector<double>> A = {
        {3.0,  -0.1, -0.2},
        {0.1,   7.0, -0.3},
        {0.3,  -0.2, 10.0}
    };
    vector<double> b = {7.85, -19.3, 71.4};

    for (int k = 0; k < n - 1; k++) {
        for (int i = k + 1; i < n; i++) {
            double factor = A[i][k] / A[k][k];
            for (int j = k; j < n; j++) A[i][j] -= factor * A[k][j];
            b[i] -= factor * b[k];
        }
    }
    vector<double> x(n);
    for (int i = n - 1; i >= 0; i--) {
        double sum = b[i];
        for (int j = i + 1; j < n; j++) sum -= A[i][j] * x[j];
        x[i] = sum / A[i][i];
    }
    cout << fixed << setprecision(6);
    for (int i = 0; i < n; i++) cout << "x[" << i+1 << "] = " << x[i] << "\\n";
    return 0;
}`,

"forward-error": `#include <iostream>
#include <vector>
#include <cmath>
#include <iomanip>
using namespace std;
int main() {
    vector<double> x_computed = {2.5793, -2.1327, 7.1121};
    vector<double> x_true     = {2.5,   -2.5,    7.0};

    double max_err = 0.0, norm_diff = 0.0, norm_true = 0.0;
    for (size_t i = 0; i < x_computed.size(); i++) {
        double diff = fabs(x_computed[i] - x_true[i]);
        if (diff > max_err) max_err = diff;
        norm_diff += diff * diff;
        norm_true += x_true[i] * x_true[i];
    }
    norm_diff = sqrt(norm_diff);
    norm_true = sqrt(norm_true);
    cout << fixed << setprecision(8);
    cout << "Infinity Norm Error: " << max_err << "\\n";
    cout << "Euclidean Error:     " << norm_diff << "\\n";
    cout << "Relative Error:      " << (norm_diff / norm_true) << "\\n";
    return 0;
}`,

"pivoting": `#include <iostream>
#include <vector>
#include <cmath>
#include <iomanip>
using namespace std;
int main() {
    int n = 3;
    vector<vector<double>> A = {
        {0.000001, 1.0, 1.0},
        {1.0,      1.0, 1.0},
        {1.0,      1.0, 2.0}
    };
    vector<double> b = {2.0, 3.0, 4.0};

    for (int k = 0; k < n - 1; k++) {
        int max_row = k;
        for (int i = k + 1; i < n; i++)
            if (fabs(A[i][k]) > fabs(A[max_row][k])) max_row = i;
        swap(A[k], A[max_row]);
        swap(b[k], b[max_row]);
        for (int i = k + 1; i < n; i++) {
            double factor = A[i][k] / A[k][k];
            for (int j = k; j < n; j++) A[i][j] -= factor * A[k][j];
            b[i] -= factor * b[k];
        }
    }
    vector<double> x(n);
    for (int i = n - 1; i >= 0; i--) {
        double sum = b[i];
        for (int j = i + 1; j < n; j++) sum -= A[i][j] * x[j];
        x[i] = sum / A[i][i];
    }
    cout << fixed << setprecision(6);
    for (int i = 0; i < n; i++) cout << "x[" << i+1 << "] = " << x[i] << "\\n";
    return 0;
}`,

"lu-decomposition": `#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;
int main() {
    int n = 3;
    vector<vector<double>> A = {
        {3.0, -0.1, -0.2},
        {0.1,  7.0, -0.3},
        {0.3, -0.2, 10.0}
    };
    vector<double> b = {7.85, -19.3, 71.4};

    vector<vector<double>> L(n, vector<double>(n, 0.0));
    vector<vector<double>> U(n, vector<double>(n, 0.0));
    for (int i = 0; i < n; i++) {
        for (int k = i; k < n; k++) {
            double s = 0;
            for (int j = 0; j < i; j++) s += L[i][j] * U[j][k];
            U[i][k] = A[i][k] - s;
        }
        for (int k = i; k < n; k++) {
            if (i == k) L[i][i] = 1.0;
            else {
                double s = 0;
                for (int j = 0; j < i; j++) s += L[k][j] * U[j][i];
                L[k][i] = (A[k][i] - s) / U[i][i];
            }
        }
    }
    vector<double> y(n), x(n);
    for (int i = 0; i < n; i++) {
        double s = b[i];
        for (int j = 0; j < i; j++) s -= L[i][j] * y[j];
        y[i] = s;
    }
    for (int i = n - 1; i >= 0; i--) {
        double s = y[i];
        for (int j = i + 1; j < n; j++) s -= U[i][j] * x[j];
        x[i] = s / U[i][i];
    }
    cout << fixed << setprecision(6);
    cout << "L Matrix:\\n";
    for (auto& row : L) { for (double v : row) cout << setw(10) << v; cout << "\\n"; }
    cout << "\\nU Matrix:\\n";
    for (auto& row : U) { for (double v : row) cout << setw(10) << v; cout << "\\n"; }
    cout << "\\nSolution x:\\n";
    for (int i = 0; i < n; i++) cout << "x[" << i+1 << "] = " << x[i] << "\\n";
    return 0;
}`,

"cholesky": `#include <iostream>
#include <vector>
#include <cmath>
#include <iomanip>
using namespace std;
int main() {
    int n = 3;
    vector<vector<double>> A = {
        { 8.0, 20.0, 15.0},
        {20.0, 80.0, 50.0},
        {15.0, 50.0, 60.0}
    };
    vector<double> b = {100.0, 250.0, 100.0};

    vector<vector<double>> L(n, vector<double>(n, 0.0));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= i; j++) {
            double s = 0;
            for (int k = 0; k < j; k++) s += L[i][k] * L[j][k];
            L[i][j] = (i == j) ? sqrt(A[i][i] - s) : (A[i][j] - s) / L[j][j];
        }
    }
    vector<double> y(n), x(n);
    for (int i = 0; i < n; i++) {
        double s = b[i];
        for (int j = 0; j < i; j++) s -= L[i][j] * y[j];
        y[i] = s / L[i][i];
    }
    for (int i = n - 1; i >= 0; i--) {
        double s = y[i];
        for (int j = i + 1; j < n; j++) s -= L[j][i] * x[j];
        x[i] = s / L[i][i];
    }
    cout << fixed << setprecision(4);
    cout << "L Matrix:\\n";
    for (auto& row : L) { for (double v : row) cout << setw(10) << v; cout << "\\n"; }
    cout << "\\nSolution x:\\n";
    for (int i = 0; i < n; i++) cout << "x[" << i+1 << "] = " << x[i] << "\\n";
    return 0;
}`,

"gauss-jacobi": `#include <iostream>
#include <vector>
#include <cmath>
#include <iomanip>
using namespace std;
int main() {
    int max_iter = 25;
    double tol = 1e-5;

    double x1 = 0, x2 = 0, x3 = 0;
    cout << fixed << setprecision(6);
    cout << "Iter\\tx1\\t\\tx2\\t\\tx3\\n";
    for (int i = 1; i <= max_iter; i++) {
        double nx1 = (7.85  + 0.1*x2  + 0.2*x3) / 3.0;
        double nx2 = (-19.3 - 0.1*x1  + 0.3*x3) / 7.0;
        double nx3 = (71.4  - 0.3*x1  + 0.2*x2) / 10.0;
        cout << i << "\\t" << nx1 << "\\t" << nx2 << "\\t" << nx3 << "\\n";
        if (fabs(nx1-x1)<tol && fabs(nx2-x2)<tol && fabs(nx3-x3)<tol) break;
        x1 = nx1; x2 = nx2; x3 = nx3;
    }
    return 0;
}`,

"gauss-seidel": `#include <iostream>
#include <vector>
#include <cmath>
#include <iomanip>
using namespace std;
int main() {
    int max_iter = 25;
    double tol = 1e-5;

    double x1 = 0, x2 = 0, x3 = 0;
    cout << fixed << setprecision(6);
    cout << "Iter\\tx1\\t\\tx2\\t\\tx3\\n";
    for (int i = 1; i <= max_iter; i++) {
        double px1 = x1, px2 = x2, px3 = x3;
        x1 = (7.85  + 0.1*x2  + 0.2*x3) / 3.0;
        x2 = (-19.3 - 0.1*x1  + 0.3*x3) / 7.0;
        x3 = (71.4  - 0.3*x1  + 0.2*x2) / 10.0;
        cout << i << "\\t" << x1 << "\\t" << x2 << "\\t" << x3 << "\\n";
        if (fabs(x1-px1)<tol && fabs(x2-px2)<tol && fabs(x3-px3)<tol) break;
    }
    return 0;
}`,

"multivariable-newton-2d": `#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;
int main() {
    double x = 2.0;
    double y = -1.0;
    int iterations = 5;

    cout << fixed << setprecision(6);
    for (int i = 1; i <= iterations; i++) {
        double f  = x*x + y*y - 5.0;
        double g  = x*x*x + y*y*y - 2.0;
        double j11 = 2*x,   j12 = 2*y;
        double j21 = 3*x*x, j22 = 3*y*y;
        double det = j11*j22 - j12*j21;
        double dx = (j22*f - j12*g) / det;
        double dy = (-j21*f + j11*g) / det;
        x -= dx;
        y -= dy;
        cout << "Iter " << i << ": x=" << x << "  y=" << y << "\\n";
    }
    return 0;
}`,

"multivariable-newton-3d": `#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;
vector<double> solve3x3(vector<vector<double>> A, vector<double> F) {
    for (int i = 0; i < 3; i++) {
        for (int k = i+1; k < 3; k++) {
            double c = A[k][i] / A[i][i];
            for (int j = i; j < 3; j++) A[k][j] -= c * A[i][j];
            F[k] -= c * F[i];
        }
    }
    vector<double> dx(3);
    for (int i = 2; i >= 0; i--) {
        double s = F[i];
        for (int j = i+1; j < 3; j++) s -= A[i][j] * dx[j];
        dx[i] = s / A[i][i];
    }
    return dx;
}
int main() {
    double x = 1.0;
    double y = 2.0;
    double z = 3.0;
    int iterations = 5;

    cout << fixed << setprecision(6);
    for (int i = 1; i <= iterations; i++) {
        double f = x*x + y*y + z*z - 14.0;
        double g = x*x + y*y - z  -  8.0;
        double h = x   + y   + z  -  6.0;
        vector<vector<double>> J = {{2*x,2*y,2*z},{2*x,2*y,-1},{1,1,1}};
        vector<double> F = {f, g, h};
        vector<double> dx = solve3x3(J, F);
        x -= dx[0]; y -= dx[1]; z -= dx[2];
        cout << "Iter " << i << ": x=" << x << "  y=" << y << "  z=" << z << "\\n";
    }
    return 0;
}`,

"newton-divided-diff": `#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;
int main() {
    vector<double> x = {1.0, 4.0, 6.0, 5.0};
    vector<double> y = {0.0, 1.386294, 1.791759, 1.609438};
    double eval_x  = 2.0;
    double true_val = 0.693147;

    int n = x.size();
    vector<vector<double>> t(n, vector<double>(n, 0.0));
    for (int i = 0; i < n; i++) t[i][0] = y[i];
    for (int j = 1; j < n; j++)
        for (int i = 0; i < n-j; i++)
            t[i][j] = (t[i+1][j-1] - t[i][j-1]) / (x[i+j] - x[i]);
    cout << fixed << setprecision(6);
    cout << "Divided Difference Table:\\n";
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n-i; j++) cout << setw(12) << t[i][j];
        cout << "\\n";
    }
    double result = t[0][0], mult = 1.0;
    for (int j = 1; j < n; j++) {
        mult *= (eval_x - x[j-1]);
        result += mult * t[0][j];
    }
    cout << "\\nInterpolated at x=" << eval_x << " : " << result << "\\n";
    cout << "True Error: " << fabs(true_val - result) << "\\n";
    return 0;
}`,

"lagrange": `#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;
int main() {
    vector<double> x = {0.0, 1.0, 2.0};
    vector<double> y = {1.0, 3.0, 2.0};
    double xp = 1.5;

    int n = x.size();
    double yp = 0.0;
    cout << fixed << setprecision(6);
    for (int i = 0; i < n; i++) {
        double L = 1.0;
        for (int j = 0; j < n; j++)
            if (i != j) L *= (xp - x[j]) / (x[i] - x[j]);
        cout << "L" << i << "(" << xp << ") = " << L << "\\n";
        yp += L * y[i];
    }
    cout << "\\nInterpolated at x=" << xp << " : " << yp << "\\n";
    return 0;
}`,

"differentiation": `#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;
double f(double x) {
    return -0.1*pow(x,4) - 0.15*pow(x,3) - 0.5*pow(x,2) - 0.25*x + 1.2;
}
double df_true(double x) {
    return -0.4*pow(x,3) - 0.45*pow(x,2) - x - 0.25;
}
double d2f_true(double x) {
    return -1.2*pow(x,2) - 0.9*x - 1.0;
}
int main() {
    double x = 0.5;
    double h = 0.25;

    double d1  = df_true(x);
    double d2  = d2f_true(x);
    double d1f = (f(x+h) - f(x)) / h;
    double d1b = (f(x) - f(x-h)) / h;
    double d1c = (f(x+h) - f(x-h)) / (2*h);
    double d2f = (f(x+2*h) - 2*f(x+h) + f(x)) / (h*h);
    double d2b = (f(x) - 2*f(x-h) + f(x-2*h)) / (h*h);
    double d2c = (f(x+h) - 2*f(x) + f(x-h)) / (h*h);
    cout << fixed << setprecision(6);
    cout << "1st Derivative (True=" << d1 << "):\\n";
    cout << "Forward:  " << d1f << "  err=" << fabs((d1-d1f)/d1)*100 << "%\\n";
    cout << "Backward: " << d1b << "  err=" << fabs((d1-d1b)/d1)*100 << "%\\n";
    cout << "Central:  " << d1c << "  err=" << fabs((d1-d1c)/d1)*100 << "%\\n";
    cout << "\\n2nd Derivative (True=" << d2 << "):\\n";
    cout << "Forward:  " << d2f << "  err=" << fabs((d2-d2f)/d2)*100 << "%\\n";
    cout << "Backward: " << d2b << "  err=" << fabs((d2-d2b)/d2)*100 << "%\\n";
    cout << "Central:  " << d2c << "  err=" << fabs((d2-d2c)/d2)*100 << "%\\n";
    return 0;
}`,

"trapezoidal": `#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;
double f(double x) {
    return 0.2 + 25*x - 200*pow(x,2) + 675*pow(x,3) - 900*pow(x,4) + 400*pow(x,5);
}
int main() {
    double a = 0.0;
    double b = 0.8;
    double true_val = 1.640533;
    int n = 8;

    double h = (b - a) / n;
    double sum = 0.5 * (f(a) + f(b));
    for (int i = 1; i < n; i++) sum += f(a + i*h);
    double result = sum * h;
    cout << fixed << setprecision(7);
    cout << "Trapezoidal Result (n=" << n << "): " << result << "\\n";
    cout << "Percent Relative Error: " << fabs((true_val-result)/true_val)*100 << "%\\n";
    return 0;
}`,

"simpsons-13": `#include <iostream>
#include <iomanip>
#include <cmath>
using namespace std;
double f(double x) {
    return 0.2 + 25*x - 200*pow(x,2) + 675*pow(x,3) - 900*pow(x,4) + 400*pow(x,5);
}
int main() {
    double a = 0.0;
    double b = 0.8;
    double true_val = 1.640533;
    int n = 4;

    double h = (b - a) / n;
    double sum = f(a) + f(b);
    for (int i = 1; i < n; i++)
        sum += (i % 2 == 1) ? 4.0*f(a+i*h) : 2.0*f(a+i*h);
    double result = (h / 3.0) * sum;
    cout << fixed << setprecision(7);
    cout << "Simpson's 1/3 Result (n=" << n << "): " << result << "\\n";
    cout << "Percent Relative Error: " << fabs((true_val-result)/true_val)*100 << "%\\n";
    return 0;
}`,

"double-integral": `#include <iostream>
#include <iomanip>
using namespace std;
double f(double x, double y) {
    return x*x + y*y;
}
int main() {
    double ax = 0.0, bx = 2.0;
    double ay = 0.0, by = 2.0;
    int    m = 4, n = 4;
    double true_val = 10.6667;

    double hx = (bx-ax)/m, hy = (by-ay)/n;
    double sum = 0.0;
    for (int i = 0; i <= m; i++) {
        double wx = (i==0 || i==m) ? 1.0 : 2.0;
        for (int j = 0; j <= n; j++) {
            double wy = (j==0 || j==n) ? 1.0 : 2.0;
            sum += wx * wy * f(ax+i*hx, ay+j*hy);
        }
    }
    double result = (hx*hy/4.0) * sum;
    cout << fixed << setprecision(4);
    cout << "Double Integral Result: " << result << "\\n";
    cout << "Relative Error: " << fabs((true_val-result)/true_val)*100 << "%\\n";
    return 0;
}`,

"gaussian-quadrature": `#include <iostream>
#include <cmath>
#include <iomanip>
using namespace std;
double f(double x) {
    return exp(-x*x);
}
int main() {
    double a = -1.0;
    double b =  1.0;

    double n2[] = {-1.0/sqrt(3.0), 1.0/sqrt(3.0)};
    double w2[] = {1.0, 1.0};
    double I2 = 0;
    for (int i = 0; i < 2; i++) {
        double t = 0.5*(b-a)*n2[i] + 0.5*(b+a);
        I2 += w2[i] * f(t);
    }
    I2 *= 0.5*(b-a);

    double n3[] = {-sqrt(0.6), 0.0, sqrt(0.6)};
    double w3[] = {5.0/9.0, 8.0/9.0, 5.0/9.0};
    double I3 = 0;
    for (int i = 0; i < 3; i++) {
        double t = 0.5*(b-a)*n3[i] + 0.5*(b+a);
        I3 += w3[i] * f(t);
    }
    I3 *= 0.5*(b-a);

    cout << fixed << setprecision(6);
    cout << "Gaussian Quadrature (n=2): " << I2 << "\\n";
    cout << "Gaussian Quadrature (n=3): " << I3 << "\\n";
    return 0;
}`,

"newton-optimization-cholesky": `#include <iostream>
#include <vector>
#include <cmath>
#include <iomanip>
using namespace std;
int main() {
    vector<double> x = {0.0, 0.0, 0.0};
    vector<vector<double>> H = {
        {2.0, 1.0, 0.0},
        {1.0, 4.0, 1.0},
        {0.0, 1.0, 6.0}
    };
    int n = 3;
    int iterations = 5;

    vector<vector<double>> L(n, vector<double>(n, 0.0));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= i; j++) {
            double s = 0;
            for (int k = 0; k < j; k++) s += L[i][k]*L[j][k];
            L[i][j] = (i==j) ? sqrt(H[i][i]-s) : (H[i][j]-s)/L[j][j];
        }
    }
    cout << fixed << setprecision(6);
    for (int iter = 1; iter <= iterations; iter++) {
        vector<double> g = {
            2*x[0] + x[1] - 2.0,
            x[0] + 4*x[1] + x[2] - 3.0,
            x[1] + 6*x[2] - 4.0
        };
        vector<double> y(n), delta(n);
        for (int i = 0; i < n; i++) {
            double s = g[i];
            for (int j = 0; j < i; j++) s -= L[i][j]*y[j];
            y[i] = s / L[i][i];
        }
        for (int i = n-1; i >= 0; i--) {
            double s = y[i];
            for (int j = i+1; j < n; j++) s -= L[j][i]*delta[j];
            delta[i] = s / L[i][i];
        }
        for (int i = 0; i < n; i++) x[i] -= delta[i];
        cout << "Iter " << iter << ": [" << x[0] << ", " << x[1] << ", " << x[2] << "]\\n";
    }
    return 0;
}`,

"parabolic-pde": `#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;
int main() {
    int nx = 5;
    double dt = 0.1;
    double dx = 0.5;
    int time_steps = 5;
    vector<double> u = {0.0, 0.0, 100.0, 0.0, 0.0};

    double r = dt / (dx * dx);
    cout << fixed << setprecision(4);
    cout << "t=0: ";
    for (double v : u) cout << setw(8) << v;
    cout << "\\n";
    for (int t = 1; t <= time_steps; t++) {
        vector<double> u_new = u;
        for (int i = 1; i < nx-1; i++)
            u_new[i] = u[i] + r*(u[i+1] - 2*u[i] + u[i-1]);
        u = u_new;
        cout << "t=" << t << ": ";
        for (double v : u) cout << setw(8) << v;
        cout << "\\n";
    }
    return 0;
}`,

"elliptic-pde": `#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;
int main() {
    int N = 5;
    int max_iter = 50;
    double top_bc    = 100.0;
    double left_bc   = 100.0;
    double right_bc  = 100.0;
    double bottom_bc = 0.0;

    vector<vector<double>> u(N, vector<double>(N, 0.0));
    for (int j = 0; j < N; j++) u[0][j]   = top_bc;
    for (int i = 0; i < N; i++) u[i][0]   = left_bc;
    for (int i = 0; i < N; i++) u[i][N-1] = right_bc;
    for (int j = 0; j < N; j++) u[N-1][j] = bottom_bc;
    for (int iter = 0; iter < max_iter; iter++)
        for (int i = 1; i < N-1; i++)
            for (int j = 1; j < N-1; j++)
                u[i][j] = 0.25*(u[i+1][j]+u[i-1][j]+u[i][j+1]+u[i][j-1]);
    cout << fixed << setprecision(2);
    cout << "2D Laplace PDE Solution:\\n";
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) cout << setw(8) << u[i][j];
        cout << "\\n";
    }
    return 0;
}`

};
