from manim import *

config.pixel_width = 1080
config.pixel_height = 1920
config.frame_width = 9
config.frame_height = 16
config.background_color = "#05070D"


class ManimPipeline(Scene):
    def construct(self):
        title = Text("Explain the pipeline\nlike an algorithm.", font_size=44, weight=BOLD, line_spacing=0.86)
        title.set_width(7.55)
        title.to_edge(UP, buff=1.25)

        eyebrow = Text("MANIM / PYTHON EXPLAINER", font_size=22, font="Consolas", color=TEAL)
        eyebrow.next_to(title, UP, buff=0.35)

        subtitle = Text(
            "Best fit: algorithms, diagrams, math, and step-by-step social clips.",
            font_size=24,
            color="#C7D2FE",
            line_spacing=0.9,
        )
        subtitle.set_width(7.4)
        subtitle.next_to(title, DOWN, buff=0.35)

        self.play(FadeIn(eyebrow, shift=DOWN * 0.25), FadeIn(title, shift=DOWN * 0.35), run_time=0.8)
        self.play(FadeIn(subtitle, shift=DOWN * 0.25), run_time=0.45)

        steps = [
            ("01", "Input", "prompt + data"),
            ("02", "Transform", "scene graph"),
            ("03", "Reason", "animated flow"),
            ("04", "Output", "MP4 explainer"),
        ]

        y_positions = [3.1, 1.35, -0.4, -2.15]
        nodes = VGroup()
        dots = VGroup()

        for (num, name, detail), y in zip(steps, y_positions):
            box = RoundedRectangle(
                width=7.4,
                height=1.25,
                corner_radius=0.08,
                stroke_width=3,
                stroke_color=TEAL if num in {"01", "02"} else ORANGE,
                fill_color="#07111F",
                fill_opacity=0.9,
            )
            box.move_to([0.35, y, 0])

            number = Text(num, font="Consolas", font_size=24, color=YELLOW).move_to([-3.05, y + 0.28, 0])
            label = Text(name, font_size=34, weight=BOLD).move_to([-1.25, y + 0.18, 0])
            desc = Text(detail, font_size=25, color="#DBEAFE").move_to([-1.15, y - 0.28, 0])
            node = VGroup(box, number, label, desc)
            nodes.add(node)

            dot = Dot(point=[-3.85, y, 0], radius=0.085, color=TEAL)
            dots.add(dot)

        rail = Line(dots[0].get_center(), dots[-1].get_center(), color="#26384A", stroke_width=7)
        flow = Line(dots[0].get_center(), dots[-1].get_center(), color=TEAL, stroke_width=7)
        flow.set_stroke(opacity=0.95)

        self.play(Create(rail), run_time=0.35)
        self.play(LaggedStart(*[FadeIn(dot, scale=0.6) for dot in dots], lag_ratio=0.12), run_time=0.55)
        self.play(LaggedStart(*[FadeIn(node, shift=RIGHT * 0.35) for node in nodes], lag_ratio=0.18), run_time=1.35)
        self.play(Create(flow), run_time=1.1)

        marker = Square(side_length=0.32, fill_color=TEAL, fill_opacity=1, stroke_width=0)
        marker.move_to(dots[0].get_center())
        self.play(FadeIn(marker, scale=0.7), run_time=0.25)
        self.play(MoveAlongPath(marker, rail), run_time=2.2, rate_func=smooth)

        payoff = Text("Manim turns logic into visible motion.", font_size=36, weight=BOLD, color=ORANGE)
        payoff.to_edge(DOWN, buff=1.15)
        self.play(FadeIn(payoff, shift=UP * 0.25), run_time=0.55)
        self.wait(0.8)
        self.play(FadeOut(VGroup(eyebrow, title, subtitle, nodes, dots, rail, flow, marker, payoff)), run_time=0.45)
