---
section: posts
layout: post
style-sheets: [default, post-page, syntaxHL]
title: Building a Game Engine - 3 | Rendering with Instancing
cover-photo: "/assets/images/posts/game-engine/image_2.webp"
---

## Representing Voxel Objects

Given the context of our engine, every object can be represented as a series
of voxels, each with their own positional and color information. 

Since we already know the shape of each voxel beforehand, that just being a cube, 
it's unnecessary for us to store the VBO, IBO, or VAO information of this mesh in
every object. We can just create a single instance of the this mesh within
the application and reference it whenever we render an object, using whatever
positional and color information provided to augment it.

{% highlight cpp %}
// pseudocode-ish

void render(vector<vec3> positions, vector<vec3> colors, ...) {
    VertexArray* voxel_vao = Voxel::VAO; // Our single instance voxel VAO

    // shader binding and uniform setting stuff ...

    for (int i = 0; i < positions.size(); i++) {
        // Not spec but gets the point across
        draw(voxel_vao, positions[i], colors[i]); // expensive*
    }
}

{% endhighlight %}

This approach works but has a major downside when implemented directly. If we
just fed the renderer a ton of positional plus color data pairs and made draw
calls for each pair, this would quickly result in a ton of draw calls.

The draw itself is fairly inexepensive but the actual dispatching of that call 
*is* expensive. To work around this, we take advantage of an optimization
technique known as instancing where the same mesh can be drawn multiple times
in a single draw call.

This requires a bit of setup but in short, we need to store the positional
and color vectors in their own VBOs and bind them to our voxel VAO in a specific
way that tells the shader to draw our mesh multiple times.

To contain these VBOs in a way that's easy for the renderer and game to work with,
I've created something called an Instanced Voxel Object or IVO.

{% highlight cpp %}

// @file    voxel.h

class InstancedVoxelObject {
    public:
        InstancedVoxelObject(
            const std::vector<glm::u8vec3>& positions,
            const std::vector<glm::u8vec3>& colors,
        );
        ~InstancedVoxelObject();

        void bind(unsinged int pos_loc, unsigned int color_loc);
        void unbind();
        unsigned int count() const { return m_count; };

    private:
        VoxelObject* m_voxel_object;
        VertexBuffer* m_positions_vbo;
        VertexBuffer* m_colors_vbo;
        unsigned int m_count;

};

{% endhighlight %}

This object contains our position and color VBOs as well as the number of
instances. We also store a pointer to something called a VoxelObject
which is really just a struct containing the VBO, IBO, and VAO of our single
voxel mesh instance. This just helps to make the binding process cleaner.

Ultimately, the game just needs to construct this object and whenever
it wants it rendered, it sends it off to the renderer queue alongside
some other components.

The result is that our `draw()` function within the renderer it fairly short.

{% highlight cpp %}
// @file    renderer.cpp

void draw(Renderer::RenderObject& obj) {
    obj.shader->bind();
    obj.shader->set_uniform_mat4f("u_ProjMatrix", obj.proj_matrix);
    obj.shader->set_uniform_mat4f("u_ViewMatrix", obj.view_matrix);
    obj.shader->set_uniform_3f("u_ModelPosition", obj.position);

    obj.ivo->bind(1, 2);
    GL_Call(glDrawElementsInstanced(
            GL_TRIANGLES, 
            Voxel::voxel_object()->m_ibo->get_count(),
            GL_UNSIGNED_INT,
            0,
            obj.ivo->count()
    ));
    obj.ivo->unbind();
    obj.shader->unbind();
}

{% endhighlight %}

That `RenderObject` is just an encapsulation of the information needed to render
the object fully, namely the IVO, shader, projection and view matrices, and
object position.

![Instancing Test]({{ site.posts-imgs-dir }}/game-engine/image_2.webp)

The image above provides an example of the capabilities that instancing
can provide. The frame captures 10 IVOs with 100,000 voxels each for a 
total of 1,000,000 voxels or 12,000,000 triangles. 

The performance is much faster than earlier implementations of non-instanced
rendering that I experimented with but it's not yet quantified.


## Next

Performance monitoring and profiling. ImGui. 

